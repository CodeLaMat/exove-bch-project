import React from "react";
import PageHeading from "../pageHeading/PageHeading";
import classes from "./MyProfile.module.css";
import { useAppSelector } from "../../hooks/hooks";


const MyProfile = () => {
  const userData = useAppSelector((state) => state.loginUser.userData);
  const FullName = userData[0].name.join(" ");
  const nameArray = FullName.split(" ");
  const firstName = nameArray[0];
  const lastName = nameArray[1];

 console.log("user:", userData);
  const currentUser = userData[0];
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
                alt={`${firstName} ${lastName}`}
              />
            ) : (
              <div className={classes.placeholder}>
                <h2>{`${firstName[0]}${lastName[0]}`}</h2>
              </div>
            )}
          </div>
          <div className={classes.profileInfo}>
            <h3>
              {firstName} {lastName}
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
              <strong>Phonenumber: </strong>
              {currentUser.phoneNumber}
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
