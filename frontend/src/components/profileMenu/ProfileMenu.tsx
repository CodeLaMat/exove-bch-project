import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProfileMenu.module.css";
import { useAppSelector } from "../../hooks/hooks";
import Dropdown from "react-bootstrap/Dropdown";
import { useTranslation } from "react-i18next";

const ProfileMenu = () => {
  const { t } = useTranslation();
  const userData = useAppSelector((state) => state.loginUser.userData);

  const FullName = userData[0].name.join(" ");
  const nameArray = FullName.split(" ");
  const firstName = nameArray[0];
  const lastName = nameArray[1];

  const navigate = useNavigate();

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      navigate(`/${eventKey}`);
    }
  };

  return (
    <div className={classes.nav_container}>
      <div className={classes.adminNav}>
        <div className={classes.mainNav}>
          {/* <div className={classes.pageHeading}>
            <h4>{userData[0].name}</h4>
          </div> */}
        </div>
        <div className={classes.dropDownNav}>
          {userData[0].imagePath === "" ? (
            <img
              className={classes.roundImage}
              src={userData[0].imagePath}
              alt={`${userData[0].name}`}
            />
          ) : (
            <div className={classes.placeholder}>
              <h2>{`${firstName[0]}${lastName[0]}`}</h2>
            </div>
          )}
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="dark" size="sm" id="dropdown-basic">
              {userData[0].name}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item eventKey="myprofile">{t("My Profile")}</Dropdown.Item>
              {userData[0].role === "hr" && (
                <Dropdown.Item eventKey="manageUsers">
                  {t("Manage Users")}
                </Dropdown.Item>
              )}
              <Dropdown.Item eventKey="logout">{t("Logout")}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>{" "}
    </div>
  );
};

export default ProfileMenu;
