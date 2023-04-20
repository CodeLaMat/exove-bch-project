import User from "../models/user";
interface TokenUser {
  userId: string;
  name: string;
  email: string;
  role: string;
}

const createTokenUser = (user: User): TokenUser => {
  return {
    userId: user._id,
    name: user.displayName as string,
    email: user.email as string,
    role: user.role,
  };
};

export default createTokenUser;
