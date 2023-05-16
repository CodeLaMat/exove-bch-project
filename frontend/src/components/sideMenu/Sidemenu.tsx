import React from "react";
import { UserRole } from "../../enum";
import classes from "./Sidemenu.module.css";
import MenuItem from "./MenuItem";
import {
  faSquarePollVertical,
  faChartSimple,
  faUsers,
  faFileCircleQuestion,
  faFileImport,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/img/logo.jpg";
import { useAppSelector } from "../../hooks/hooks";
import LanguageSwitcher from "../shared/Translation";

const Sidemenu = () => {
  const { isAuthenticated } = useAppSelector((state) => state.loginUser);

  const userData = useAppSelector((state) => state.loginUser.userData);
  const role = userData[0].role.join("");

  return (
    <div className={classes.sideMenu_container}>
      {" "}
      <div className={classes.sideMenu_content}>
        <div className={classes.logo_container}>
          <img className={classes.logo} src={logo} alt="logo" />
          <h4>EXOVE</h4>
        </div>
        <div className={classes.line}></div>
        {isAuthenticated && (
          <>
            <div className={classes.menulist}>
            <MenuItem
              name="Dashboard"
              icon={faChartSimple}
              link="/home"
              pageTitle="Dashboard"
            />
              {role === UserRole.HR && 
               <div>
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
                  />
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
                </div>
              }
              {role === UserRole.Manager &&
              <div>
                <MenuItem
                  name="Team Surveys"
                  icon={faUsers}
                  link="managerteam"
                  pageTitle="Team Surveys"
                />
              </div>
              }
              {role !== UserRole.HR &&
                <div>
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
              }       
            </div>{" "}
          </>
        )}
      </div>
      <div className={classes.LanguageSwitcher}>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Sidemenu;
