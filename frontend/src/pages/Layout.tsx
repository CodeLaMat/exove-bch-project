import React from "react";
import ProfileMenu from "../components/profileMenu/ProfileMenu";
import classes from "./Layout.module.css";
import Sidemenu from "../components/sideMenu/Sidemenu";
import { useAppSelector } from "../../src/redux/hooks/hooks";
import MainRoutes from "../routes/MainRoutes";
import { useSelector } from "react-redux";

import { selectUserInfo } from "../redux/reducers/user/userSlice";
import { RootState } from "../redux/store";

const Layout = () => {

  const userData = useSelector((state: RootState) => state.user.userData); 

  console.log("userData", userData);
  // console.log("user name", userData[0].fullName);
  const { isAuthenticated, selectedRole } = useAppSelector(
    (state) => state.loginUser
  );

  const userName =  '';
  const imageUrl = "photoFilename";

  return (
    <div>
      <div className={classes.mainConsole}>
        {isAuthenticated && (
          <aside className={classes.sidemenu}>
            <Sidemenu image={imageUrl} name={userName} role={selectedRole} />
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
