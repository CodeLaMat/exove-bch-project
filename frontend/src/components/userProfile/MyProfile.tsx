import React from "react";
import PageHeading from "../pageHeading/PageHeading";
import classes from "./MyProfile.module.css";
import { useAppSelector } from "../../../src/redux/hooks/hooks";
import { IEmployee } from "../../redux/types/userTypes";
import { RootState } from "../../redux/store";

const MyProfile = () => {
  const userEmail = useAppSelector((state) => state.loginUser.email);
  const employees: IEmployee[][] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const entries = Object.values(employees);

  const currentUser =
    entries && entries[0].find((entry) => entry.email === userEmail);

  if (!currentUser) {
    return <p>User not found.</p>;
  }

  return (
    <div className={classes.MyProfile}>
      <PageHeading pageTitle="Profile" />
      <div className={classes.userProfile}>
        <div className={classes.userHeading}>
          <h2>User profile</h2>
        </div>
        <div className={classes.profileContent}>
          <div className={classes.profileImage}>
            {currentUser.image === "" ? (
              <img
                className={classes.roundImage}
                src={currentUser.image}
                alt={`${currentUser.firstName} ${currentUser.surName}`}
              />
            ) : (
              <div className={classes.placeholder}>
                <h2>{`${currentUser.firstName[0]}${currentUser.surName[0]}`}</h2>
              </div>
            )}
          </div>
          <div className={classes.profileInfo}>
            <h3>
              {currentUser.firstName} {currentUser.surName}
            </h3>
            <p>
              {" "}
              <strong>Department: </strong>
              {currentUser.department}
            </p>
            <p>
              {" "}
              <strong>Title: </strong>
              {currentUser.title}
            </p>
            <p>
              {" "}
              <strong>About: </strong>
              {currentUser.about}
            </p>
            <ul>
              <li>
                <i className={classes.emailClassName}></i> {currentUser.email}
              </li>
              <li>
                <i className={classes.roleClassName}></i> {currentUser.role}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
