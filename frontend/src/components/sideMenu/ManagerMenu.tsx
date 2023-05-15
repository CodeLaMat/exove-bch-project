import React from "react";
import MenuItem from "./MenuItem";
import {
  faSquarePollVertical,
  faChartSimple,
  faFileCircleQuestion,
  faUsers,
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
      <MenuItem
        name="Team Surveys"
        icon={faUsers}
        link="managerteam"
        pageTitle="Team Surveys"
      />{" "}
      <MenuItem
        name="Evaluations"
        icon={faSquarePollVertical}
        link="/managerevaluations"
        pageTitle="Manager Evaluations"
      />
      <MenuItem
        name="My Surveys"
        icon={faFileCircleQuestion}
        link="/managersurveypacks"
        pageTitle="Manager Surveys"
      />
    </div>
  );
};

export default ManagerMenus;
