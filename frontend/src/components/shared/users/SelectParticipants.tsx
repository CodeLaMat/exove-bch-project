import React from "react";

import { addParticipant } from "../../../features/survey/surveyPackSlice";
import classes from "./SelectParticipants.module.css";
import { IEmployee } from "../../../types/userTypes";
import { RootState } from "../../../app/store";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

const SelectParticipants: React.FC = () => {
  const employees: IEmployee[][] = useAppSelector(
    (state: RootState) => state.employees.employees
  );

  const employeesArray = Object.values(employees);
  const dispatch = useAppDispatch();

  // const handleEmployeeSelection = (newParticipant: string) => {
  //   dispatch(addParticipant(...participants, newParticipant));
  // };

  return (
    <div className={classes.container}>
      <h4>Employee List</h4>
      <div className={classes.cardContainer}>
        {employeesArray[0].map((employee) => (
          <div
            key={employee._id}
            className={`${classes.employeeCard} ${
              employee.selected ? classes.selected : ""
            }`}
            // onClick={() => handleEmployeeSelection(employee._id)}
          >
            <img src={employee.image} alt="Employee" />
            <div className={classes.details}>
              <h5>
                {employee.firstName} {employee.surName}
              </h5>
              <p>{employee.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectParticipants;
