import React from "react";
import ProfileMenu from "../components/profileMenu/ProfileMenu";
import classes from "./Layout.module.css";
import Sidemenu from "../components/sideMenu/Sidemenu";

import MainRoutes from "../routes/MainRoutes";

const Layout = () => {
  return (
    <div>
      <div className={classes.mainConsole}>
        <aside className={classes.sidemenu}>
          <Sidemenu />
        </aside>
        <div className={classes.mainitems}>
          <ProfileMenu />
          <div className={classes.maincontent}>
            <MainRoutes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
