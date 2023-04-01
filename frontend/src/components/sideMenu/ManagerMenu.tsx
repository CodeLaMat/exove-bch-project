import React from "react";
import MenuItem from "../shared/MenuItem";
import {
  faSquarePollVertical,
  faChartSimple,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const ManagerMenus = () => {
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
    </div>
  );
};

export default ManagerMenus;
