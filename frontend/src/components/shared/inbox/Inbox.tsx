import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { UserRole } from "../../../enum";

const Inbox = () => {
  const { selectedRole } = useAppSelector((state) => state.loginUser);

  if (selectedRole === UserRole.HR) {
    return <div>HR Inbox</div>;
  } else if (selectedRole === UserRole.User) {
    return <div>Inbox Component for employee role</div>;
  } else if (selectedRole === UserRole.Manager) {
    return <div>Component for manager role</div>;
  } else return null;
};

export default Inbox;
