import React from "react";
import { UserRole } from "../../enum";
import classes from "./Sidemenu.module.css";
import logo from "../../assets/img/logo.jpg";
import { useAppSelector } from "../../../src/redux/hooks/hooks";
import HRMenus from "./HRMenus";
import ManagerMenus from "./ManagerMenu";
import UserMenus from "./UserMenus";

interface Iprops {
  image: string;
  name: string;
  role: string;
}
const Sidemenu = (props: Iprops) => {
  const { isAuthenticated, selectedRole } = useAppSelector(
    (state) => state.loginUser
  );

  return (
    <div className={classes.sideMenu_content}>
      {" "}
      <div className={classes.logo_container}>
        <img className={classes.logo} src={logo} alt="logo" />
        <h4>EXOVE</h4>
      </div>
      <div className={classes.line}></div>
      {isAuthenticated && (
        <>
          <div className={classes.menulist}>
            <h5 className={classes.sideMenu_headers}>Main Menu</h5>
            {selectedRole === UserRole.HR && <HRMenus />}
            {selectedRole === UserRole.Manager && <ManagerMenus />}
            {selectedRole === UserRole.User && <UserMenus />}
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Sidemenu;
