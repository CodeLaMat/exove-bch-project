import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import classes from "./SelectParticipants.module.css";
import { RootState } from "../../../app/store";
import { IEmployee } from "../../../types/userTypes";
import { IParticipant } from "../../../types/dataTypes";
import PageHeading from "../../pageHeading/PageHeading";
import { useParams } from "react-router";
import {
  approveParticipant,
  rejectParticipant,
} from "../../../features/survey/paticipantsSlice";
import Button from "../../shared/button/Button";
import ParticipantSelectionModal from "./ParticipantSelectionModal";

const SelectParticipants: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userid } = useParams();
  const userId = userid ?? "";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedParticipants: IParticipant[] = useAppSelector(
    (state: RootState) => state.selectedParticipants.selectedParticipants
  );
  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const employeesArray = Object.values(employees);

  // Sorting employees by name
  const sortedEmployees = [...employeesArray].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  // Filter the sortedEmployees array to get the selected employees' extra information
  const participants = sortedEmployees.filter((employee) =>
    selectedParticipants.some(
      (participant) =>
        participant.id === employee._id && participant.employee === userid
    )
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={classes.container}>
      <PageHeading pageTitle="Select participants" />
      <Button
        variant="standard"
        onClick={openModal}
        className={classes.changeParticipantsButton}
      >
        Change Participants
      </Button>
      {participants ? (
        <div className={classes.cardContainer}>
          {participants.map((employee) => (
            <div key={employee._id} className={classes.employeeCard}>
              <div className={classes.employeeImage}>
                {employee.image && employee.image === "" ? (
                  <img
                    className={classes.employee_roundImage}
                    src={employee.image}
                    alt={`${employee.firstName} ${employee.surName}`}
                  />
                ) : (
                  <div className={classes.employee_placeholder}>
                    <h2>
                      {employee.firstName && employee.surName
                        ? `${employee.firstName[0]}${employee.surName[0]}`
                        : ""}
                    </h2>
                  </div>
                )}
              </div>
              <div className={classes.details}>
                <h5>
                  {employee.firstName} {employee.surName}
                </h5>
                <p>{employee.title}</p>
              </div>
              <div className={classes.hrActions}></div>
            </div>
          ))}
        </div>
      ) : null}
      <ParticipantSelectionModal
        isOpen={isModalOpen}
        userId={userId}
        onRequestClose={closeModal}
        selectedParticipants={selectedParticipants}
        allEmployees={sortedEmployees}
      />
    </div>
  );
};

export default SelectParticipants;
