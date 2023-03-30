import React from "react";
import MenuItem from "../shared/MenuItem";
import classes from "./Sidemenu.module.css";
import logo from "../../assets/img/logo.jpg";
import {
  faSquarePollVertical,
  faChartSimple,
  faMessage,
  faUsers,
  faFileCircleQuestion,
  faChartPie,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";

interface Iprops {
  image: string;
  name: string;
}
const Sidemenu = (props: Iprops) => {
  return (
    <div className={classes.sideMenu_content}>
      <div className={classes.logo_container}>
        <img className={classes.logo} src={logo} alt="logo" />
        <h1>EXOVE</h1>
      </div>
      <div className={classes.line}></div>
      <div className={classes.menulist}>
        <h3 className={classes.sideMenu_headers}>Main Menu</h3>
        <div>
          <MenuItem
            name="DashBoard"
            icon={faChartSimple}
            link="/home"
            pageTitle="Dashboard"
          />
          <MenuItem
            name="Inbox"
            icon={faMessage}
            link="/inbox"
            pageTitle="Inbox"
          />
        </div>
      </div>
      <div className={classes.menulist}>
        <h3 className={classes.sideMenu_headers}>Workspace</h3>
        <MenuItem
          name="Surveys"
          icon={faSquarePollVertical}
          link="/surveys"
          pageTitle="Surveys"
        />
        <MenuItem name="Users" icon={faUsers} link="/users" pageTitle="Users" />
        <MenuItem
          name="Questionnaire"
          icon={faFileCircleQuestion}
          link="/questionnaire"
          pageTitle="Questionnaire"
        />
        <MenuItem
          name="Analytics"
          icon={faChartPie}
          link="/analytics"
          pageTitle="Analytics"
        />
        <div className={classes.menulist}>
          <h3 className={classes.sideMenu_headers}>Other features</h3>
          <MenuItem
            name="File & Folders"
            icon={faFileImport}
            link="/filesfolders"
            pageTitle="File & Foldes"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
