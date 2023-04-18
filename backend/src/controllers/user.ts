import { Request, Response } from "express";
import User from "../models/user";
import { UserRoles } from "../types/dataTypes";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { attachCookiesToResponse } from "../util/jwt";
import * as ldap from 'ldapjs';
import { SearchEntryObject, SearchOptions } from 'ldapjs';
import { promisify } from 'util';

interface LdapUser {
  role: string;
  name: string;
  email: string;
  phoneNumber: string;
  groupId: string;
  imagePath: string;
}

interface LdapLoginRequestBody {
  username: string;
  password: string;
}

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

interface LoginRequestBody {
  email: string;
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
  if (!email || !password) {
    throw new BadRequestError("Please provide your name and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid email");
  }
  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   throw new UnauthenticatedError("Invalid Credentials");
  // }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid password");
  }

  console.log('user', user);

  const tokenUser = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };
  console.log('tokenUser', tokenUser);
  

  const payload: JwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
    expiresIn: `${process.env.JWT_LIFETIME}`,
  });

  console.log('token', token);

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
  // attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({
    user: token,
  });
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
    attributes: ['cn', 'memberOf', 'gidNumber', 'description', 'mail', 'jpegPhoto', 'telephoneNumber' ],
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
          phoneNumber: userData.telephoneNumber,
          groupId: userData.gidNumber,
          imagePath: userData.jpegPhoto,
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

const getAllLdapUsers = async (req: Request, res: Response) => {
  console.log("getting all ldap users");
  try {
    const client = createNewClient();

    const opts: SearchOptions = {
      filter: '(objectClass=user)',
      scope: 'sub',
      attributes: ['cn', 'mail', 'memberOf']
    };

    const users: any[] = [];

    const searchAsync = promisify(client.search.bind(client));

    const result = await searchAsync('ou=People,dc=test,dc=com', opts) as ldap.SearchCallbackResponse;

      console.log("search completed");
      result.on('searchEntry', (entry: any) => {
        users.push(entry.object);
      });

      console.log("array built");
      result.on('error', (err: Error) => {
        console.error(err);
        console.log("error after array");
        return res.status(500).send(err);
      });
      console.log("sending it all out");
      console.log("users", users);
      res.on('end', (result) => {
        console.log(`Found ${users.length} users`);
        console.log(users);
        return res.json(users);
      });
  } catch (err) {
    console.error(err);
    console.log("We hit an error");
    return res.status(500).send(err);
  }
}


// const getAllUsers = async (req: Request, res: Response) => {
//   const users = await User.find({}).sort("role");
//   res.status(StatusCodes.OK).json({ users, count: users.length });
// };

interface QueryParams {
  search?: string;
  role?: UserRoles;
  sort?: "asc" | "desc";
}

const getAllUsers = async (req: Request, res: Response) => {
  const queryParams: QueryParams = req.query;
  const search = queryParams.search || "";

  const query = {
    $or: [
      { firstName: new RegExp(search, "i") },
      { surname: new RegExp(search, "i") },
    ],
  };

  let result = User.find(query);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const users = await result;

  const totalUsers = await User.countDocuments(query);
  const numOfPages = Math.ceil(totalUsers / limit);

  res.status(StatusCodes.OK).json({ users, totalUsers, numOfPages });
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

export { login, ldapLogin, getAllUsers, getAllLdapUsers, getOneUser };

