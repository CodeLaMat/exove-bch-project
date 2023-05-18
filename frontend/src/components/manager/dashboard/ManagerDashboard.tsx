import React, { useEffect } from "react";
import classes from "./ManagerDashboard.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { IEmployee } from "../../../types/dataTypes";
import { RootState } from "../../../app/store";
import PageHeading from "../../pageHeading/PageHeading";
import UserChart from "./UserChart";
import { initialiseSurveyPacks } from "../../../features/survey/surveyPacksSlice";
import { initialiseEmployees } from "../../../features/user/employeesSlice";
import Button from "../../shared/button/Button";
import { useTranslation } from "react-i18next";

const ManagerDashboard = () => {
  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.loginUser.userData[0]);
  const email = userData.email.join("");
  const FullName = userData.name.join(" ");
  const nameArray = FullName.split(" ");
  const firstName = nameArray[0];
  const lastName = nameArray[1];

  const currentUser =
    employees && employees.find((entry) => entry.email === email);

  useEffect(() => {
    dispatch(initialiseSurveyPacks());
    dispatch(initialiseEmployees());
  }, []);

  if (!currentUser) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      <PageHeading pageTitle={t("Dashboard")} />{" "}
      <div className={classes.userDashboardContainer}>
        {" "}
        <div className={classes.userDashContainer}>
          <div className={classes.userInfoContainer}>
            <div className={classes.userImageContainer}>
              {currentUser.image === "" ? (
                <img
                  className={classes.roundImage}
                  src={userData[0].imagePath}
                  alt={`${userData[0].name}`}
                />
              ) : (
                <div className={classes.info_placeholder}>
                  <div>{`${firstName[0]}${lastName[0]}`}</div>
                </div>
              )}
            </div>

            <div className={classes.profileContainer}>
              <div className={classes.profileRow}>
                <div className={classes.profileLabel}>{t("Name")}:</div>
                <div
                  className={classes.profileData}
                >{`${currentUser.firstName} ${currentUser.surName}`}</div>
              </div>
              <div className={classes.profileRow}>
                <div className={classes.profileLabel}>{t("Email")}:</div>
                <div className={classes.profileData}>{currentUser.email}</div>
              </div>
              <div className={classes.profileRow}>
                <div className={classes.profileLabel}>{t("Department")}:</div>
                <div className={classes.profileData}>
                  {currentUser.department}
                </div>
              </div>
              <div className={classes.profileRow}>
                <div className={classes.profileLabel}>{t("Title")}:</div>
                <div className={classes.profileData}>{currentUser.title}</div>
              </div>
              <div className={classes.profileRow}>
                <div className={classes.profileLabel}>{t("Manager")}:</div>
                <div className={classes.profileData}>
                  {currentUser.work.reportsTo}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.userPerformContainer}>
          <h3>{t("Performance based on the last survey")}</h3>
          <div className={classes.userPerform_heading}>
            <div className={classes.userPerform_date}>
            {t("Survey Date")}: <p>12/03/2023</p>
            </div>
            <Button variant="secondary">{t("View report")}</Button>
          </div>
          <UserChart />
          <div>
            <div className={classes.container}>
              <h3>{t("Categories")}</h3>
              <div className={classes.category}>
                <div className={`${classes.color} ${classes.qualityColor}`} />
                <div className={classes.categoryName}>{t("Quality")}Quality:</div>
                <div className={classes.categoryPercentage}>0%</div>
              </div>
              <div className={classes.category}>
                <div className={`${classes.color} ${classes.socialColor}`} />
                <div className={classes.categoryName}>{t("Social skills")}:</div>
                <div className={classes.categoryPercentage}>0%</div>
              </div>
              <div className={classes.category}>
                <div className={`${classes.color} ${classes.selfColor}`} />
                <div className={classes.categoryName}>{t("Self-guidance")}:</div>
                <div className={classes.categoryPercentage}>0%</div>
              </div>
              <div className={classes.category}>
                <div className={`${classes.color} ${classes.leaderColor}`} />
                <div className={classes.categoryName}>{t("Leadership")}:</div>
                <div className={classes.categoryPercentage}>0%</div>
              </div>
              <div className={classes.category}>
                <div className={`${classes.color} ${classes.changeColor}`} />
                <div className={classes.categoryName}>
                {t("Readiness for change")}:
                </div>
                <div className={classes.categoryPercentage}>0%</div>
              </div>
              <div className={classes.breifInfo}>
              {t("You’re doing good")}You’re doing good!
                <p>
                {t("Your average performance is 100% better than the last survey")}
                </p>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
