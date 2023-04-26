import React from "react";
import MenuItem from "../shared/MenuItem";
import classes from "./Sidemenu.module.css";
import {
  faSquarePollVertical,
  faChartSimple,
  faMessage,
  faUsers,
  faFileCircleQuestion,
  faChartPie,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";

const HRMenus = () => {
  return (
    <div>
      <MenuItem
        name="DashBoard"
        icon={faChartSimple}
        link="/home"
        pageTitle="Dashboard"
      />
      <MenuItem name="Inbox" icon={faMessage} link="/inbox" pageTitle="Inbox" />{" "}
      <MenuItem
        name="Surveys"
        icon={faSquarePollVertical}
        link="/surveys"
        pageTitle="Surveys"
      />
      <MenuItem name="Users" icon={faUsers} link="/users" pageTitle="Users" />
      <MenuItem
        name="Feedbacks"
        icon={faFileCircleQuestion}
        link="/feedbacks"
        pageTitle="Feedbacks"
      />
      <MenuItem
        name="Analytics"
        icon={faChartPie}
        link="/analytics"
        pageTitle="Analytics"
      />{" "}
      <div className={classes.menulist}>
        <h6 className={classes.sideMenu_headers}>Other features</h6>
        <MenuItem
          name="File & Folders"
          icon={faFileImport}
          link="/filesfolders"
          pageTitle="File & Foldes"
        />
      </div>
    </div>
  );
};

export default HRMenus;
