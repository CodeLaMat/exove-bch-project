import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import classes from "./SelectParticipants.module.css";
import { RootState } from "../../../app/store";
import { IEmployee } from "../../../types/userTypes";
import { removeParticipants } from "../../../features/survey/paticipantsSlice";
import { IParticipant, IParticipantInput } from "../../../types/dataTypes";
import Button from "../../shared/button/Button";
import { Toast } from "react-bootstrap";
import {
  initialiseSurveyPacks,
  updateEmployeesTakingSurvey,
  updateManagerInSurvey,
} from "../../../features/survey/surveyPacksSlice";

interface SelectMyParticipantsProps {
  surveyPackId: string;
}

const SelectMyParticipants: React.FC<SelectMyParticipantsProps> = ({
  surveyPackId,
}) => {
  const dispatch = useAppDispatch();
  const [selectedParticipants, setSelectedParticipants] = useState<
    IParticipantInput[]
  >([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantsName, setParticipantsName] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const employeesArray = Object.values(employees);

  //Sorting employees by name
  const sortedEmployees = [...employeesArray].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );
  const selectedParticipantsFromStore: IParticipant[] = useAppSelector(
    (state: RootState) => state.selectedParticipants.selectedParticipants
  );

  useEffect(() => {
    const names: string[] = [];
    participants.forEach((participantId) => {
      const foundUser = sortedEmployees.find((employee) => {
        return employee._id === participantId;
      });
      if (foundUser) {
        const name = `${foundUser.firstName} ${foundUser.surName}`;
        names.push(name);
      }
    });
    setParticipantsName(names);
  }, [participants]);

  useEffect(() => {
    setSelectedParticipants(selectedParticipantsFromStore);
  }, [dispatch]);

  const participantSelectionHandler = (participantId: string) => {
    const isSelected = participants.includes(participantId);

    if (isSelected) {
      const updatedParticipants = participants.filter(
        (id) => id !== participantId
      );
      setParticipants(updatedParticipants);
      setSelectedParticipants((prev) =>
        prev.filter((participant) => participant.employee !== participantId)
      );
    } else {
      if (participants.length < 5) {
        const foundUser = sortedEmployees.find((employee) => {
          return employee._id === participantId;
        });
        if (foundUser) {
          const newParticipant: IParticipantInput = {
            acceptanceStatus: "Pending",
            isSurveyComplete: false,
            employee: participantId,
          };
          setSelectedParticipants((prev) => [...prev, newParticipant]);
          setParticipants((prev) => [...prev, participantId]);
        }
      }
    }
  };

  const handleSubmit = () => {
    setShowToast(true);
    dispatch(
      updateEmployeesTakingSurvey({
        surveyPackId: surveyPackId,
        updatedParticipants: selectedParticipants,
      })
    );
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
    dispatch(initialiseSurveyPacks());
    setParticipants([]);
  };

  const handleRemoveParticipants = () => {
    dispatch(removeParticipants());
    setParticipants([]);
    setSelectedParticipants([]);
  };

  return (
    <div className={classes.participantSelection}>
      <div>
        Selected participants:{participantsName && participantsName.join(",")}
      </div>
      <div className={classes.cardContainer}>
        {sortedEmployees.map((employee) => (
          <div
            key={employee._id}
            className={`${classes.employeeCard} ${
              participants.includes(employee._id) ? classes.selected : ""
            }`}
            onClick={() => participantSelectionHandler(employee._id)}
          >
            <div className={classes.details}>
              <h5>
                {employee.firstName} {employee.surName}
              </h5>
              <p>{employee.title}</p>
            </div>
          </div>
        ))}{" "}
      </div>{" "}
      <Button
        variant="primary"
        className={classes.submitButton}
        disabled={participants.length !== 5}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Button
        variant="alert"
        className={classes.submitButton}
        onClick={handleRemoveParticipants}
      >
        Clear
      </Button>{" "}
      <Toast className={classes.toast} show={showToast} autohide bg="info">
        <Toast.Header>
          <strong className="mr-auto">Participants Submitted</strong>
        </Toast.Header>
        <Toast.Body>
          The selected participants have been successfully submitted.
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default SelectMyParticipants;
