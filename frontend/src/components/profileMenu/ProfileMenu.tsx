import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProfileMenu.module.css";
import { RootState } from "../../app/store";
import { IEmployee } from "../../types/userTypes";
import { useAppSelector } from "../../hooks/hooks";

const ProfileMenu = () => {
  const userEmail = useAppSelector((state) => state.loginUser.email);
  const surName = useAppSelector((state) => state.loginUser.surName);
  const firstName = useAppSelector((state) => state.loginUser.firstName);
  const role = useAppSelector((state) => state.loginUser.setSelectedRole);
  const image = "";
  const employees: IEmployee[][] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const entries = Object.values(employees);
  console.log("entries", entries);
  console.log(`userEmail: ${userEmail}, surName: ${surName}, firstName: ${firstName}, role: ${role} `);

  // const currentUser =
  //   entries && entries[0]?.find((entry) => entry.email === userEmail);

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
            {surName} {firstName}
          </h4>
        </div>
      </div>
      <div className={classes.dropDownNav}>
        {image === "" ? (
          <img
            className={classes.roundImage}
            src={image}
            alt={`${firstName} ${surName}`}
          />
        ) : (
          <div className={classes.placeholder}>
            <h2>{`${surName}${firstName}`}</h2>
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
            {surName} {firstName}
          </option>
          <option value="myprofile">My Profile</option>
          <option value="Info">Info</option>
          {role === "hr" && (
            <option value="manageUsers">Manage Users</option>
          )}
          <option value="Logout">Logout</option>
        </select>
      </div>
    </div>
  );
};

export default ProfileMenu;
