import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProfileMenu.module.css";
import { useAppSelector } from "../../hooks/hooks";
import LanguageSwitcher from "../shared/Translation";

const ProfileMenu = () => {
  const userData = useAppSelector((state) => state.loginUser.userData);

  const FullName = userData[0].name.join(" ");
  const nameArray = FullName.split(" ");
  const firstName = nameArray[0];
  const lastName = nameArray[1];

  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "myprofile") {
      navigate("/myprofile");
    } else if (e.target.value === "Info") {
      navigate("/info");
    } else if (e.target.value === "Manage Users") {
      navigate("/info");
    } else {
      navigate("/logout");
    }
  };

  return (
    <div className={classes.adminNav}>
      <div className={classes.mainNav}>
        <div className={classes.pageHeading}>
          <h4>{userData[0].name}</h4>
        </div>
        <div className={classes.LanguageSwitcher}>
          <LanguageSwitcher />
        </div>
        
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
        <select
          name="selection"
          id="selection"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            changeHandler(e)
          }
        >
          <option value={firstName} hidden>
            {" "}
            {userData[0].name}
          </option>
          <option value="myprofile">My Profile</option>
          <option value="Info">Info</option>
          {userData[0].role === "hr" && (
            <option value="manageUsers">Manage Users</option>
          )}
          <option value="Logout">Logout</option>
        </select>
      </div>
    </div>
  );
};

export default ProfileMenu;
