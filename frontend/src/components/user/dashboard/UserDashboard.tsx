import React, { useEffect } from "react";
import classes from "./UserDashboard.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { IEmployee } from "../../../types/dataTypes";
import { RootState } from "../../../app/store";
import PageHeading from "../../pageHeading/PageHeading";
import UserChart from "./UserChart";
import { initialiseSurveyPacks } from "../../../features/survey/surveyPacksSlice";
import { initialiseEmployees } from "../../../features/user/employeesSlice";

const UserDashboard = () => {
  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
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
    <div className={classes.userDashContainer}>
      <PageHeading pageTitle="Profile" />
      <div className={classes.userInfoContainer}>
        <div className={classes.userImageContainer}>
          {currentUser.image === "" ? (
            <img
              className={classes.roundImage}
              src={userData[0].imagePath}
              alt={`${userData[0].name}`}
            />
          ) : (
            <div className={classes.placeholder}>
              <div>{`${firstName[0]}${lastName[0]}`}</div>
            </div>
          )}
        </div>{" "}
        <div>
          <h2>{`${firstName} ${lastName}`}</h2>
        </div>{" "}
        <div className={classes.placeholder}>
          <h2>{currentUser.title}</h2>
        </div>{" "}
        <div className={classes.userInfoId}>
          <h5>ID: {currentUser._id}</h5>
        </div>{" "}
        <div className={classes.profileContainer}>
          <div className={classes.profileRow}>
            <div className={classes.profileLabel}>Name:</div>
            <div
              className={classes.profileData}
            >{`${currentUser.firstName} ${currentUser.surName}`}</div>
          </div>
          <div className={classes.profileRow}>
            <div className={classes.profileLabel}>Email:</div>
            <div className={classes.profileData}>{currentUser.email}</div>
          </div>
          <div className={classes.profileRow}>
            <div className={classes.profileLabel}>Department:</div>
            <div className={classes.profileData}>{currentUser.department}</div>
          </div>
          <div className={classes.profileRow}>
            <div className={classes.profileLabel}>Title:</div>
            <div className={classes.profileData}>{currentUser.title}</div>
          </div>
          <div className={classes.profileRow}>
            <div className={classes.profileLabel}>Manager:</div>
            <div className={classes.profileData}>
              {currentUser.work.reportsTo}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.userPerformContainer}>
        <div>
          <h3>Performance based on the last survey</h3>
        </div>
        <div>
          <div>
            Survey Time: <p>12/03/2023</p>
          </div>
          <button>Vew report</button>
        </div>
        <UserChart />
        <div>
          <div className={classes.container}>
            <h3>Categories</h3>
            <div className={classes.category}>
              <div className={`${classes.color} ${classes.qualityColor}`} />
              <div className={classes.categoryName}>Quality:</div>
              <div className={classes.categoryPercentage}>{"quality"}%</div>
            </div>
            <div className={classes.category}>
              <div className={`${classes.color} ${classes.socialColor}`} />
              <div className={classes.categoryName}>Social skills:</div>
              <div className={classes.categoryPercentage}>{"social"}%</div>
            </div>
            <div className={classes.category}>
              <div className={`${classes.color} ${classes.selfColor}`} />
              <div className={classes.categoryName}>Self-guidance:</div>
              <div className={classes.categoryPercentage}>{"self"}%</div>
            </div>
            <div className={classes.category}>
              <div className={`${classes.color} ${classes.leaderColor}`} />
              <div className={classes.categoryName}>Leadership:</div>
              <div className={classes.categoryPercentage}>{"leader"}%</div>
            </div>
            <div className={classes.category}>
              <div className={`${classes.color} ${classes.changeColor}`} />
              <div className={classes.categoryName}>Readiness for change:</div>
              <div className={classes.categoryPercentage}>{"change"}%</div>
            </div>{" "}
            You’re doing good!
            <p>Your average performance is --% better than the last survey</p>
          </div>
        </div>{" "}
      </div>{" "}
      <div></div>
    </div>
  );
};

export default UserDashboard;
