import React from "react";
import ProfileMenu from "../components/profileMenu/ProfileMenu";
import classes from "./Layout.module.css";
import Sidemenu from "../components/sideMenu/Sidemenu";
import { useAppSelector } from "../../src/redux/hooks/hooks";
import MainRoutes from "../routes/MainRoutes";

const Layout = () => {
  const { isAuthenticated, selectedRole } = useAppSelector(
    (state) => state.loginUser
  );

  const userName = "Essi Salomaa";
  const imageUrl = "photoFilename";

  return (
    <div>
      <div className={classes.mainConsole}>
        {isAuthenticated && (
          <aside className={classes.sidemenu}>
            <Sidemenu name={userName} image={imageUrl} role={selectedRole} />
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
