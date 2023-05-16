import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import classes from "./ChangeParticipant.module.css";
import { RootState } from "../../../../app/store";
import { IEmployee } from "../../../../types/userTypes";
import { removeParticipants } from "../../../../features/survey/paticipantsSlice";
import { IParticipant, IParticipantInput } from "../../../../types/dataTypes";
import Button from "../../../shared/button/Button";
import { Toast } from "react-bootstrap";
import {
  initialiseSurveyPacks,
  replaceSurveyorInSurvey,
} from "../../../../features/survey/surveyPacksSlice";

interface SelectMyParticipantProps {
  surveyPackId: string;
  declinedParticipantId: string; // ID of the participant who declined
}

const ChangeParticipant: React.FC<SelectMyParticipantProps> = ({
  surveyPackId,
  declinedParticipantId,
}) => {
  const dispatch = useAppDispatch();
  const [selectedParticipant, setSelectedParticipant] =
    useState<IParticipantInput | null>(null);
  const [participant, setParticipant] = useState<string>("");
  const [participantName, setParticipantName] = useState<string>("");
  const [showToast, setShowToast] = useState(false);

  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const employeesArray = Object.values(employees);
  const sortedEmployees = [...employeesArray].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  useEffect(() => {
    if (participant) {
      const foundUser = sortedEmployees.find((employee) => {
        return employee._id === participant;
      });
      if (foundUser) {
        const name = `${foundUser.firstName} ${foundUser.surName}`;
        setParticipantName(name);
      }
    }
  }, [participant]);

  useEffect(() => {
    const declinedParticipant = sortedEmployees.find(
      (employee) => employee._id === declinedParticipantId
    );
    if (declinedParticipant) {
      const newParticipant: IParticipantInput = {
        acceptanceStatus: "Pending",
        isSurveyComplete: false,
        employee: declinedParticipantId,
      };
      setSelectedParticipant(newParticipant);
      setParticipant(declinedParticipantId);
    }
  }, [declinedParticipantId]);

  const participantSelectionHandler = (participantId: string) => {
    if (participantId === participant) {
      setParticipant("");
      setSelectedParticipant(null);
    } else {
      const foundUser = sortedEmployees.find((employee) => {
        return employee._id === participantId;
      });
      if (foundUser) {
        const newParticipant: IParticipantInput = {
          acceptanceStatus: "Pending",
          isSurveyComplete: false,
          employee: participantId,
        };
        setSelectedParticipant(newParticipant);
        setParticipant(participantId);
      }
    }
  };

  console.log("Selected", participant);

  const handleSubmit = () => {
    setShowToast(true);
    if (selectedParticipant) {
      const newParticipant: IParticipantInput = {
        acceptanceStatus: "Pending",
        isSurveyComplete: false,
        employee: participant,
      };
      dispatch(
        replaceSurveyorInSurvey({
          surveyPackId: surveyPackId,
          oldUserId: declinedParticipantId,
          newParticipant,
        })
      );
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      dispatch(initialiseSurveyPacks());
      setParticipant("");
      setSelectedParticipant(null);
    }
  };

  const handleRemoveParticipant = () => {
    dispatch(removeParticipants());
    setParticipant("");
    setSelectedParticipant(null);
  };

  return (
    <div className={classes.participantSelection}>
      <div>Selected participant:{participantName}</div>
      <div className={classes.cardContainer}>
        {sortedEmployees.map((employee) => (
          <div
            key={employee._id}
            className={`${classes.employeeCard} ${
              participant === employee._id ? classes.selected : ""
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
        disabled={!participant}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Button
        variant="alert"
        className={classes.submitButton}
        onClick={handleRemoveParticipant}
      >
        Clear
      </Button>{" "}
      <Toast className={classes.toast} show={showToast} autohide bg="info">
        <Toast.Header>
          <strong className="mr-auto">Participant Submitted</strong>
        </Toast.Header>
        <Toast.Body>
          The selected participant has been successfully submitted.
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default ChangeParticipant;
