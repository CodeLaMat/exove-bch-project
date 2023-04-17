import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { UserRole } from "../../../enum";

const FileFolders = () => {
  const { selectedRole } = useAppSelector((state) => state.loginUser);

  if (selectedRole === UserRole.HR) {
    return <div>FileFolders</div>;
  } else return null;
};

export default FileFolders;
