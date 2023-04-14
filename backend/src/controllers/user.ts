import { Request, Response } from "express";
import User from "../models/user";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import * as ldap from 'ldapjs';
import { SearchEntryObject, SearchOptions } from 'ldapjs';
console.log("user.ts activated");
interface JwtPayload {
  _id: string;
  email: string;
  role: string;
}
interface LdapUser {
  role: string;
  name: string;
  email: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LdapLoginRequestBody {
  username: string;
  password: string;
}

const createNewClient = () => {
  const client = ldap.createClient({
    url: 'ldap://localhost:389',
  });
  console.log("client", client);

  return client;
};

const login = async (req: Request, res: Response) => {
  const { email, password }: LoginRequestBody = req.body;
  console.log("login with ", email);
  if (!email || !password) {
    throw new BadRequestError("Please provide your name and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const payload: JwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
    expiresIn: "2d",
  });
  res.status(StatusCodes.OK).json({ user: { name: user.displayName }, token });
};

const ldapLogin = async (req: Request, res: Response) => {
  const { username, password }: LdapLoginRequestBody = req.body;

  console.log(`${username} is trying to login with ${password} as a pwd`);
  const client = createNewClient();

  const bindDN = `uid=${username},ou=People,dc=test,dc=com`;

  client.bind(bindDN, password, (err: Error | null) => {
    if (err) {
      console.error(err);
      res.status(401).send('Authentication failed');
      return;
    }
  })

  const searchOptions: SearchOptions = {
    scope: 'sub',
    filter: `(&(uid=${username})(objectClass=posixAccount))`, // add objectClass filter
    attributes: ['cn', 'memberOf', 'gidNumber', 'description', 'mail', ],
  };

  client.search(`uid=${username},ou=People,dc=test,dc=com`, searchOptions, (err: Error | null, result: ldap.SearchCallbackResponse) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving user info');
      return;
    }

    const userAttributes: SearchEntryObject[] = [];

    result.on('searchEntry', (entry) => {
      userAttributes.push(entry.object);
    });

    result.on('end', () => {
      console.log("authentication successfull");
      const userData = userAttributes[0];

      const payload = { 
        user: { 
          role: userData.description,
          name: userData.cn,
          email: userData.mail,
        } as LdapUser,
      };
      const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
        expiresIn: "2d",
      });
   
        res.status(200).send({
          message: 'Authentication successful',
          user: userAttributes[0],
          groups: userAttributes[0].memberOf, // get groups the user is a member of
          token: token,
        });
    });
  });
}

const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({}).sort("role");
  res.status(StatusCodes.OK).json({ users, count: users.length });
};
const getOneUser = async (req: Request, res: Response) => {
  const {
    params: { id: userId },
  } = req;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};
// const register = async (req: Request, res: Response) => {
//   res.send("user register");
// };
// const updateUser = async (req: Request, res: Response) => {
//   res.send("show stats");
// };
// const deleteUser = async (req: Request, res: Response) => {
//   res.send("show stats");
// };

export { login, ldapLogin, getAllUsers, getOneUser };
