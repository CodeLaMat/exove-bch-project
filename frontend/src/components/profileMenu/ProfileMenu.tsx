import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProfileMenu.module.css";
import { RootState } from "../../redux/store";
import { Employee } from "../../redux/types/userTypes";
import profileImage from "../../assets/img/Essi_WP.jpg";
import { useAppSelector } from "../../../src/redux/hooks/hooks";

interface Iprops {
  imageUrl: string;
  userName: string;
  pageTitle: string;
  userRole: string; // new prop for the user's role
}

const ProfileMenu = (props: Iprops) => {
  const userEmail = useAppSelector((state) => state.loginUser.email);
  const employees: Employee[][] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const entries = Object.values(employees);

  const currentUser =
    entries && entries[0].find((entry) => entry.email === userEmail);

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
          <h4>
            {currentUser?.surName} {currentUser?.firstName}
          </h4>
        </div>
      </div>
      <div className={classes.dropDownNav}>
        {currentUser?.image === "" ? (
          <img
            className={classes.roundImage}
            src={currentUser.image}
            alt={`${currentUser.firstName} ${currentUser.surName}`}
          />
        ) : (
          <div className={classes.placeholder}>
            <h2>{`${currentUser?.surName[0]}${currentUser?.firstName[0]}`}</h2>
          </div>
        )}
        <select
          name="selection"
          id="selection"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            changeHandler(e)
          }
        >
          <option value={currentUser?.firstName} hidden>
            {" "}
            {currentUser?.surName} {currentUser?.firstName}
          </option>
          <option value="myprofile">My Profile</option>
          <option value="Info">Info</option>
          {currentUser?.role === "hr" && (
            <option value="manageUsers">Manage Users</option>
          )}
          <option value="Logout">Logout</option>
        </select>
      </div>
    </div>
  );
};

export default ProfileMenu;
