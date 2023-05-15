import React from "react";
import { UserRole } from "../../../enum";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

const Analytics = () => {
  const { selectedRole } = useAppSelector((state) => state.loginUser);

  if (selectedRole === UserRole.HR) {
    return <div>Analytics Page will be here</div>;
  } else return null;
};

export default Analytics;
