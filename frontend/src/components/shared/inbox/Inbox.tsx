import React from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { UserRole } from "../../../enum";

const Inbox = () => {
  const { selectedRole } = useAppSelector((state) => state.loginUser);

  const userData = useAppSelector((state) => state.loginUser.userData);
  const user = userData[0];
  const role = user.role.join("");

  if (role === UserRole.HR) {
    return <div>HR Inbox</div>;
  } else if (role === UserRole.User) {
    return <div>Inbox Component for employee role</div>;
  } else if (role === UserRole.Manager) {
    return <div>Component for manager role</div>;
  } else return null;
};

export default Inbox;
