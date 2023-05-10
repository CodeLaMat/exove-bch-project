import React from "react";
import PageHeading from "../pageHeading/PageHeading";
import classes from "./MyProfile.module.css";
import { useAppSelector } from "../../hooks/hooks";
import { IEmployee } from "../../types/userTypes";
import { RootState } from "../../app/store";

const MyProfile = () => {
  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const userData = useAppSelector((state) => state.loginUser.userData[0]);
  const email = userData.email.join("");
  const FullName = userData.name.join(" ");
  const nameArray = FullName.split(" ");
  const firstName = nameArray[0];
  const lastName = nameArray[1];

  const currentUser =
    employees && employees.find((entry) => entry.email === email);
  console.log("userEmail:", email);
  console.log("userData:", userData.email);
  console.log("CurrentUser:", lastName[0]);

  if (!currentUser) {
    return <p>User not found.</p>;
  }

  return (
    <div className={classes.MyProfile}>
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
                alt={""}
              />
            ) : (
              <div className={classes.placeholder}>
                <h2>{`${firstName[0]} ${lastName[0]}`}</h2>
              </div>
            )}
          </div>
          <div className={classes.profileInfo}>
            <h3>
              <strong>Fullname:</strong> {FullName}
            </h3>
            <p>
              {" "}
              <strong>Department: </strong>
              {currentUser.role}
            </p>
            <p>
              {" "}
              <strong>Title: </strong>
              {currentUser.title}
            </p>
            <p>
              {" "}
              <strong>Site: </strong>
              {currentUser.site}
            </p>
            <p>
              {" "}
              <strong>Email: </strong>
              {currentUser.email}
            </p>
            <p>
              {" "}
              <strong>Role: </strong>
              {currentUser.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
