import React from "react";
import { UserRole } from "../../enum";
import classes from "./Sidemenu.module.css";
import logo from "../../assets/img/logo.jpg";
import { useAppSelector } from "../../hooks/hooks";
import HRMenus from "./HRMenus";
import ManagerMenus from "./ManagerMenu";
import UserMenus from "./UserMenus";
import LanguageSwitcher from "../shared/Translation";

const Sidemenu = () => {
  const { isAuthenticated } = useAppSelector((state) => state.loginUser);

  const userData = useAppSelector((state) => state.loginUser.userData);
  const role = userData[0].role.join("");

  return (
    <div className={classes.sideMenu_container}>
      {" "}
      <div className={classes.sideMenu_content}>
        <div className={classes.logo_container}>
          <img className={classes.logo} src={logo} alt="logo" />
          <h4>EXOVE</h4>
        </div>
        <div className={classes.line}></div>
        {isAuthenticated && (
          <>
            <div className={classes.menulist}>
              {role === UserRole.HR && <HRMenus />}
              {role === UserRole.Manager && <ManagerMenus />}
              {role === UserRole.User && <UserMenus />}
            </div>{" "}
          </>
        )}
      </div>
      <div className={classes.LanguageSwitcher}>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Sidemenu;
