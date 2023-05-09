import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import classes from "./ParticipantSelection.module.css";
import { RootState } from "../../../app/store";
import { IEmployee } from "../../../types/userTypes";
import { Button } from "react-bootstrap";
import PageHeading from "../../pageHeading/PageHeading";
import {
  removeParticipants,
  selectParticipantsByIds,
} from "../../../features/survey/paticipantsSlice";
import { IParticipant } from "../../../types/dataTypes";
import { initialiseEmployees } from "../../../features/user/employeesSlice";
import { useTranslation } from "react-i18next";

const ParticipantSelection = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [participants, setParticipants] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<IEmployee | null>(null);

  const userData = useAppSelector((state) => state.loginUser.userData);
  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const employeesArray = Object.values(employees);

  //Sorting employees by name
  const sortedEmployees = [...employeesArray].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );
  const selectedParticipants: IParticipant[] = useAppSelector(
    (state: RootState) => state.selectedParticipants.selectedParticipants
  );

  console.log(selectedParticipants);

  const email = userData[0]?.email.join("");

  useEffect(() => {
    if (email) {
      const foundUser = sortedEmployees.find((employee) => {
        return employee.email === email;
      });
      setCurrentUser(foundUser || null);
    }
  }, [email, sortedEmployees]);

  const handleParticipantSelection = (participantId: string) => {
    const isSelected = participants.includes(participantId);

    if (isSelected) {
      const updatedParticipants = participants.filter(
        (id) => id !== participantId
      );
      setParticipants(updatedParticipants);
    } else {
      const updatedParticipants = [...participants, participantId];
      setParticipants(updatedParticipants);
    }
  };

  const handleSubmit = () => {
    const userId = currentUser?._id;
    const userIdString = userId as string;
    dispatch(
      selectParticipantsByIds({
        participantIds: participants,
        userId: userIdString,
      })
    );
    setParticipants([]);
  };

  const handleRemoveParticipants = () => {
    dispatch(removeParticipants());
    setParticipants([]);
  };

  useEffect(() => {
    dispatch(initialiseEmployees());
  }, [dispatch]);

  return (
    <div className={classes.participantSelection}>
      <PageHeading pageTitle={t("Select participants")} />
      <div className={classes.cardContainer}>
        {sortedEmployees.map((employee) => (
          <div
            key={employee._id}
            className={`${classes.employeeCard} ${
              participants.includes(employee._id) ? classes.selected : ""
            }`}
            onClick={() => handleParticipantSelection(employee._id)}
          >
            <div className={classes.employeeImage}>
              {employee.image === "" ? (
                <img
                  className={classes.employee_roundImage}
                  src={employee.image}
                  alt={`${employee.firstName} ${employee.surName}`}
                />
              ) : (
                <div className={classes.employee_placeholder}>
                  <h2>{`${employee.firstName[0]}${employee.surName[0]}`}</h2>
                </div>
              )}
            </div>
            <div className={classes.details}>
              <h5>
                {employee.firstName} {employee.surName}
              </h5>
              <p>{employee.title}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="primary"
        className={classes.submitButton}
        disabled={participants.length !== 5}
        onClick={handleSubmit}
      >
        {t("Submit")}
      </Button>

      <Button
        variant="primary"
        className={classes.submitButton}
        onClick={handleRemoveParticipants}
      >
        {t("Clear")}
      </Button>
    </div>
  );
};

export default ParticipantSelection;
