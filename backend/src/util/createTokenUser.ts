import User from "../models/user";
interface TokenUser {
  userId: User["_id"];
  name: User["displayName"];
  email: User["email"];
  role: User["role"];
}

const createTokenUser = (user: User): TokenUser => {
  return {
    userId: user._id,
    name: user.displayName,
    email: user.email,
    role: user.role,
  };
};

export default createTokenUser;
