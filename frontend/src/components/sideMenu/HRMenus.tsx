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

import { useTranslation } from "react-i18next";

const HRMenus = () => {
  const { t } = useTranslation();
  return (
    <div>
      <MenuItem
        name={t('Dashboard')}
        icon={faChartSimple}
        link="/home"
        pageTitle={t('Dashboard')}
      />
      <MenuItem 
        name={t('Users')} 
        icon={faMessage} 
        link="/inbox" 
        pageTitle={t('Users')} />{" "}
      <MenuItem
        name={t('Surveys')}
        icon={faSquarePollVertical}
        link="/surveys"
        pageTitle={t('Surveys')}
      />
      <MenuItem 
        name={t('Users')} 
        icon={faUsers} 
        link="/users" 
        pageTitle={t('Users')} />
      <MenuItem
        name={t('Feedback')}
        icon={faFileCircleQuestion}
        link="/feedbacks"
        pageTitle={t('Feedback')}
      />
      <MenuItem
        name={t('Analytics')}
        icon={faChartPie}
        link="/analytics"
        pageTitle={t('Analytics')}
      />{" "}
      <div className={classes.menulist}>
        <h6 className={classes.sideMenu_headers}>{t('File & Foldes')}</h6>
        <MenuItem
          name={t('File & Foldes')}
          icon={faFileImport}
          link="/filesfolders"
          pageTitle={t('File & Foldes')}
        />
      </div>
    </div>
  );
};

export default HRMenus;
