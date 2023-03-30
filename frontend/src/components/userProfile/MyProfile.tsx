import React from "react";
import PageHeading from "../pageHeading/PageHeading";
import classes from "./MyProfile.module.css";
import profileImage from "../../assets/img/Essi_WP.jpg";

const MyProfile = () => {
  return (
    <div className={classes.MyProfile}>
      <PageHeading pageTitle="Profile" />
      <div className={classes.userProfile}>
        <div className={classes.userHeading}>
          <h2>User profile</h2>
        </div>
        <div className={classes.profileContent}>
          <div className={classes.profileImage}>
            <img
              className={classes.roundImage}
              src={profileImage}
              alt={`Essi Salomaa`}
            />
          </div>
          <div className={classes.profileInfo}>
            <h3>Essi Salomaa</h3>
            <p>
              {" "}
              <strong>About:</strong>People Operations Specialist
            </p>
            <ul>
              <li>
                <i className={classes.emailClassName}></i> :
                essi.salomaa@exove.com
              </li>
              <li>
                <i className={"fa fa-phone"}></i> : +358 123 4567
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
