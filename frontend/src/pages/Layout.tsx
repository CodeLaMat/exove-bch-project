import React, { useEffect } from "react";
import ProfileMenu from "../components/profileMenu/ProfileMenu";
import classes from "./Layout.module.css";
import Sidemenu from "../components/sideMenu/Sidemenu";
import { useAppSelector } from "../../src/redux/hooks/hooks";
import MainRoutes from "../routes/MainRoutes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";

const Layout = () => {

  const userData = useSelector((state: RootState) => state.user.userData[0]); 

  const { isAuthenticated, selectedRole } = useAppSelector(
    (state) => state.loginUser
  );

  const userName =  userData.name;
  const imageUrl = "photoFilename";
  const userRole = userData.role;

  
  return (
    <div>
      <div className={classes.mainConsole}>
        {isAuthenticated && (
          <aside className={classes.sidemenu}>
            <Sidemenu image={imageUrl} name={userName} role={userRole} />
          </aside>
        )}
        <div className={classes.mainitems}>
          {isAuthenticated && (
            <ProfileMenu
              userName={userName}
              imageUrl={imageUrl}
              pageTitle={userName}
            />
          )}
          <div className={classes.maincontent}>
            <MainRoutes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
