import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import classes from "./SelectManager.module.css";
import { RootState } from "../../../app/store";
import { IEmployee } from "../../../types/userTypes";
import {
  deselectParticipant,
  removeParticipants,
  selectParticipant,
  setManagerSelected,
} from "../../../features/survey/paticipantsSlice";
import { IParticipant, IParticipantInput } from "../../../types/dataTypes";
import Button from "../../shared/button/Button";
import { Toast } from "react-bootstrap";
import {
  initialiseSurveyPacks,
  updateEmployeesTakingSurvey,
  updateManagerInSurvey,
} from "../../../features/survey/surveyPacksSlice";

interface SelectMyParticipantsProps {
  setSelectedManager: React.Dispatch<React.SetStateAction<null>>;
  surveyPackId: string;
}

const SelectMyManager: React.FC<SelectMyParticipantsProps> = ({
  surveyPackId,
}) => {
  const dispatch = useAppDispatch();
  const [manager, setManager] = useState<string[]>([]);
  const [ManagerName, setManagerName] = useState<string[]>([]);
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
    manager.forEach((managerid) => {
      const foundUser = sortedEmployees.find((employee) => {
        return employee._id === managerid;
      });
      if (foundUser) {
        const name = `${foundUser.firstName} ${foundUser.surName}`;
        names.push(name);
      }
    });
    setManagerName(names);
  }, [manager]);

  const managerSelectionHandler = (participantId: string) => {
    const foundUser = sortedEmployees.find((employee) => {
      return employee._id === participantId;
    });

    if (foundUser) {
      const newParticipant: IParticipantInput = {
        acceptanceStatus: "Pending",
        isSurveyComplete: false,
        employee: participantId,
      };

      if (manager.includes(participantId)) {
        // If the manager is already selected, deselect the manager
        dispatch(deselectParticipant([participantId]));

        setManager([]);
        dispatch(setManagerSelected(false));
      } else {
        // Deselect any previously selected manager
        dispatch(deselectParticipant(manager));
        dispatch(selectParticipant([newParticipant]));
        setManager([participantId]);
      }
    }
    dispatch(updateManagerInSurvey({ surveyPackId, participantId }));
  };

  // handleSubmit
  const handleSubmit = () => {
    setShowToast(true);
    dispatch(
      updateEmployeesTakingSurvey({
        surveyPackId: surveyPackId,
        updatedParticipants: selectedParticipantsFromStore,
      })
    );
    dispatch(setManagerSelected(true));
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
    dispatch(initialiseSurveyPacks());

    setManager([]);
  };

  const handleRemoveParticipants = () => {
    dispatch(removeParticipants());
    setManager([]);
    dispatch(setManagerSelected(false));
  };

  return (
    <div className={classes.participantSelection}>
      <div>Selected participants:{ManagerName}</div>
      <div className={classes.cardContainer}>
        {sortedEmployees.map((employee) => (
          <div
            key={employee._id}
            className={`${classes.employeeCard} ${
              manager.includes(employee._id) ? classes.selected : ""
            }`}
            onClick={() => managerSelectionHandler(employee._id)}
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
        disabled={manager.length !== 1}
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

export default SelectMyManager;
