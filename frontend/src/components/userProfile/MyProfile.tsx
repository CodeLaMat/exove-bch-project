import React from "react";
import PageHeading from "../pageHeading/PageHeading";
import classes from "./MyProfile.module.css";
import { useAppSelector } from "../../hooks/hooks";
import { IEmployee } from "../../types/userTypes";
import { RootState } from "../../app/store";
import { useTranslation } from "react-i18next";

const MyProfile = () => {
  const { t } = useTranslation();

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
    return <p>{t("User not found")}.</p>;
  }

  return (
    <div className={classes.MyProfile}>
      <div className={classes.userProfile}>
        <div className={classes.userHeading}>
          <h2>{t("User profile")}</h2>
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
              <strong>{t("Fullname")}:</strong> {FullName}
            </h3>
            <p>
              {" "}
              <strong>{t("Department")}: </strong>
              {currentUser.role}
            </p>
            <p>
              {" "}
              <strong>{t("Title")}Title: </strong>
              {currentUser.title}
            </p>
            <p>
              {" "}
              <strong>{t("Site")}: </strong>
              {currentUser.site}
            </p>
            <p>
              {" "}
              <strong>{t("Email")}: </strong>
              {currentUser.email}
            </p>
            <p>
              {" "}
              <strong>{t("Role")}: </strong>
              {currentUser.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
