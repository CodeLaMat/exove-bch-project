import React, { useEffect, useState } from "react";
import classes from "./SelectParticipants.module.css";
import { IEmployee } from "../../../types/userTypes";
import { RootState } from "../../../app/store";
import { useAppSelector } from "../../../hooks/hooks";
import { useParams } from "react-router";
import PageHeading from "../../pageHeading/PageHeading";

const SelectEmployee: React.FC = () => {
  const { userid } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [userID, setuserID] = useState("");

  const employees: IEmployee[][] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const employeesArray = Object.values(employees);

  useEffect(() => {
    const selectedEmployee = employeesArray[0].find(
      (employee) => employee._id === userid
    );

    if (selectedEmployee) {
      const { firstName, surName, title, image, _id } = selectedEmployee;
      // setFirstName(firstName);
      // setLastName(surName);
      // setTitle(title);
      // setImage(image);
      // setuserID(_id);
    }
  }, [userid, employees]);

  return (
    <div className={classes.container}>
      <PageHeading pageTitle="Select employee" />
      <div className={classes.cardContainer}>
        <div
          key={userID}
          className={classes.employeeCard}
          // onClick={() => handleEmployeeSelection(employee._id)}
        >
          <div className={classes.employeeImage}>
            {image === "" ? (
              <img
                className={classes.employee_roundImage}
                src={image}
                alt={`${firstName} ${lastName}`}
              />
            ) : (
              <div className={classes.employee_placeholder}>
                <h2>{`${firstName[0]}${lastName[0]}`}</h2>
              </div>
            )}
          </div>
          <div className={classes.details}>
            <h5>
              {firstName} {lastName}
            </h5>
            <p>{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectEmployee;
