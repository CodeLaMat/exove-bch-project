import React from "react";
import MenuItem from "./MenuItem";
import { faChartSimple, faMessage } from "@fortawesome/free-solid-svg-icons";

const UserMenus = () => {
  return (
    <div>
      <MenuItem
        name="DashBoard"
        icon={faChartSimple}
        link="/home"
        pageTitle="Dashboard"
      />
      <MenuItem
        name="Evaluations"
        icon={faMessage}
        link="/userevaluations"
        pageTitle="Survey Packs"
      />{" "}
      <MenuItem
        name="My Surveys"
        icon={faMessage}
        link="/usersurveypacks"
        pageTitle="My Survey Packs"
      />{" "}
    </div>
  );
};

export default UserMenus;
