import React from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { UserRole } from "../../../enum";

const Inbox = () => {
  const { selectedRole } = useAppSelector((state) => state.loginUser);

  const userRole = selectedRole.join("");

  if (userRole === UserRole.HR) {
    return <div>HR Inbox</div>;
  } else if (userRole === UserRole.User) {
    return <div>Inbox Component for employee role</div>;
  } else if (userRole === UserRole.Manager) {
    return <div>Component for manager role</div>;
  } else return null;
};

export default Inbox;
