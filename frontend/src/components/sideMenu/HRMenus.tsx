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
        name={t("Dashboard")}
        icon={faChartSimple}
        link="/home"
        pageTitle={t("Dashboard")}
      />
      <MenuItem
        name={t("Survey Forms")}
        icon={faSquarePollVertical}
        link="/surveys"
        pageTitle={t("Survey Forms")}
      />
      <MenuItem
        name={t("Employees")}
        icon={faUsers}
        link="/employees"
        pageTitle={t("Employees")}
      />{" "}
      <div className={classes.menulist}>
        <MenuItem
          name={t("Pending")}
          icon={faFileImport}
          link="/pendingsurveys"
          pageTitle={t("Awaiting Approval")}
        />
      </div>
      <MenuItem
        name={t("Feedback")}
        icon={faFileCircleQuestion}
        link="/feedbacks"
        pageTitle={t("Feedback")}
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
