import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProfileMenu.module.css";
import profileImage from "../../assets/img/Essi_WP.jpg";

interface Iprops {
  imageUrl: string;
  userName: string;
  pageTitle: string;
}

const ProfileMenu = (props: Iprops) => {
  const { userName, pageTitle } = props;
  const navigation = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "myprofile") {
      navigation("/myprofile");
    } else if (e.target.value === "Info") {
      navigation("/info");
    } else {
      navigation("/logout");
    }
  };

  return (
    <div className={classes.adminNav}>
      <div className={classes.mainNav}>
        <div className={classes.pageHeading}>
          <h2>{pageTitle}</h2>
        </div>
      </div>
      <div className={classes.dropDownNav}>
        <img src={profileImage} alt={userName} className={classes.roundImage} />
        <select
          name="selection"
          id="selection"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            changeHandler(e)
          }
        >
          <option value={userName} hidden>
            {userName}
          </option>
          <option value="myprofile">My Profile</option>
          <option value="Info">Info</option>
          <option value="Logout">Logout</option>
        </select>
      </div>
    </div>
  );
};

export default ProfileMenu;
