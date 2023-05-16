import React from "react";
import MenuItem from "./MenuItem";
import classes from "./Sidemenu.module.css";
import {
  faSquarePollVertical,
  faChartSimple,
  faUsers,
  faFileCircleQuestion,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const HRMenus: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <MenuItem
        name="Dashboard"
        icon={faChartSimple}
        link="/home"
        pageTitle="Dashboard"
      />
      <MenuItem
        name="Survey Forms"
        icon={faSquarePollVertical}
        link="/surveys"
        pageTitle="Survey Forms"
      />
      <MenuItem
        name="Employees"
        icon={faUsers}
        link="/employees"
        pageTitle="Employees"
      />{" "}
      <div className={classes.menulist}>
        <MenuItem
          name="Pending"
          icon={faFileImport}
          link="/pendingsurveys"
          pageTitle="Awaiting Approval"
        />
      </div>
      <MenuItem
        name="Feedback"
        icon={faFileCircleQuestion}
        link="/feedbacks"
        pageTitle="Feedback"
      />
      {/* <MenuItem
        name={t("Analytics")}
        icon={faChartPie}
        link="/analytics"
        pageTitle={t("Analytics")}
        disabled={true}
      />{" "} */}
    </div>
  );
};

export default HRMenus;
