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

// import bcrypt from "bcryptjs";
import {
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
} from "../util";
import * as ldap from "ldapjs";
import { SearchEntryObject, SearchOptions } from "ldapjs";
import { promisify } from "util";

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
    url: "ldap://localhost:389",
  });

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

  // const tokenUser = {
  //   userId: user._id,
  //   name: user.displayName as string,
  //   email: user.email,
  //   role: user.role,
  // };
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  // const payload: JwtPayload = {
  //   _id: user._id,
  //   email: user.email,
  //   role: user.role,
  // };
  // const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
  //   expiresIn: `${process.env.JWT_LIFETIME}`,
  // });

  // const oneDay = 1000 * 60 * 60 * 24;
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + oneDay),
  //   secure: process.env.NODE_ENV === "production",
  //   signed: true,
  // });


  const payload: JwtPayload = {
    userId: user._id,
    email: user.email as string,
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


const logout = async (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  return res.status(StatusCodes.OK).json({ msg: "user logout" });
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({}).sort("role");
  res.status(StatusCodes.OK).json({ users, count: users.length });
};

// interface QueryParams {
//   search?: string;
//   role?: UserRoles;
//   sort?: "asc" | "desc";
// }

// const getAllUsers = async (req: Request, res: Response) => {
//   const queryParams: QueryParams = req.query;
//   const search = queryParams.search || "";

//   const query = {
//     $or: [
//       { firstName: new RegExp(search, "i") },
//       { surname: new RegExp(search, "i") },
//     ],
//   };

//   let result = User.find(query);

//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

//   result = result.skip(skip).limit(limit);

//   const users = await result;

//   const totalUsers = await User.countDocuments(query);
//   const numOfPages = Math.ceil(totalUsers / limit);

//   res.status(StatusCodes.OK).json({ users, totalUsers, numOfPages });
// };

const ldapLogin = async (req: Request, res: Response) => {
  const { username, password }: LdapLoginRequestBody = req.body;


  console.log(`${username} is trying to login with ${password} as a pwd`);
  const client = createNewClient();


  const bindDN = `uid=${username},ou=People,dc=test,dc=com`;

  client.bind(bindDN, password, (err: Error | null) => {
    if (err) {
      console.error(err);
      res.status(401).send("Authentication failed");
      return;
    }
  });

  const searchOptions: SearchOptions = {
    scope: "sub",
    filter: `(&(uid=${username})(objectClass=posixAccount))`, // add objectClass filter
    attributes: [
      "cn",
      "memberOf",
      "gidNumber",
      "description",
      "mail",
      "jpegPhoto",
      "telephoneNumber",
    ],
  };

  client.search(
    `uid=${username},ou=People,dc=test,dc=com`,
    searchOptions,
    (err: Error | null, result: ldap.SearchCallbackResponse) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving user info");
        return;
      }

      const userAttributes: SearchEntryObject[] = [];

      result.on("searchEntry", (entry) => {
        const user: Record<string, any> = {};
        entry.attributes.forEach((attribute) => {
          const key = attribute.type;
          const value = attribute.vals;
          user[key] = value;
        });
        userAttributes.push(user as SearchEntryObject);
      });

      result.on("end", () => {
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
        console.log("payload", payload);
        const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
          expiresIn: "2d",
        });
        const oneDay = 1000 * 60 * 60 * 24;
        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + oneDay),
          secure: process.env.NODE_ENV === "production",
          signed: true,
        });

        console.log("userToken", token);

        res.status(200).send({
          message: "Authentication successful",
          user: userAttributes[0],
          groups: userAttributes[0].memberOf, // get groups the user is a member of
          token: token,
        });
      });
    }
  );
};

const getAllLdapUsers = async (req: Request, res: Response) => {
  console.log("getting all ldap users");
  const client = createNewClient();

  const bindDN = `cn=admin,dc=test,dc=com`;

  client.bind(bindDN, "myadminpassword", (err: Error | null) => {
    if (err) {
      console.error(err);
      res.status(401).send("Authentication failed");
      return;
    }
  });

  const opts: SearchOptions = {
    filter: "(objectClass=inetOrgPerson)",
    scope: "sub",
    attributes: ["*"],
  };

  const users: any[] = [];

  client.search(
    `ou=People,dc=test,dc=com`,
    opts,
    (err: Error | null, result: ldap.SearchCallbackResponse) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving user info");
        return;
      }

      const userAttributes: SearchEntryObject[] = [];

      result.on("searchEntry", (entry) => {
        const user: Record<string, any> = {};
        entry.attributes.forEach((attribute) => {
          const key = attribute.type;
          const value = attribute.vals;
          user[key] = value;
        });
        userAttributes.push(user as SearchEntryObject);
      });

      result.on("end", () => {
        console.log("authentication successfull");
        const userData = users[0];

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
        console.log("payload", payload);
      });
    }
  );

  await client.unbind();
  console.log("client unbound");
};




const getOneUser = async (req: Request, res: Response) => {
  const {
    params: { id: userId },
  } = req;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  checkPermissions(req.user, userId);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ user: req.user });
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

export {
  login,
  ldapLogin,
  getAllUsers,
  getAllLdapUsers,
  getOneUser,
  logout,
  showCurrentUser,
};

