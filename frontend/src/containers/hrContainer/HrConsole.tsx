import React from "react";
import classes from "./HrConsole.module.css";
import Main from "../../routes/templates/main/Main";
import ProfileMenu from "../../components/profileMenu/ProfileMenu";
import Sidemenu from "../../components/sideMenu/Sidemenu";

const HrConsole = () => {
  return (
    <div className={classes.adminconsole}>
      <aside className={classes.sidemenu}>
        <Sidemenu name={`Essi Salomaa`} image={"photoFilename"} />
      </aside>
      <div className={classes.mainitems}>
        <div className={classes.topmenu}>
          <ProfileMenu
            userName={`Essi Salomaa`}
            imageUrl={"photoFilename"}
            pageTitle={"Essi Salomaa"}
          />{" "}
        </div>
        <div className={classes.maincontent}>
          <Main />
        </div>
      </div>
    </div>
  );
};
export default HrConsole;
