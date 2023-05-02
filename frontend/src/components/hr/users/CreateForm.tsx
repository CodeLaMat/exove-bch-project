import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useParams } from "react-router-dom";
import SecondComponent from "./SecondComponent";
import classes from "./CreateForm.module.css";
import { RootState } from "../../../app/store";
import { IEmployee } from "../../../types/userTypes";
import { ISurveypack } from "../../../types/dataTypes";
import {
  setSurveyPack,
  updateCreationDate,
  updateUpdateDate,
  updatePersonBeingSurveyed,
  addParticipant,
  removeParticipant,
  updateDeadline,
  updateStatus,
  toggleManagerApproved,
  toggleHrApproved,
  addManager,
  removeManager,
} from "../../../features/survey/surveyPackSlice";

import SelectEmployee from "./SelectEmployee";
import SelectParticipants from "./SelectParticipants";
import Button from "../../shared/button/Button";

const CreateForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userid } = useParams<any>();
  const surveyPack = useAppSelector((state) => state.surveyPack);

  const [steps, setSteps] = useState([
    {
      key: "firstStep",
      label: "Select employee",
      isDone: true,
      component: <SelectEmployee />,
    },
    {
      key: "secondStep",
      label: "Select Participants",
      isDone: false,
      component: <SelectParticipants />,
    },
    {
      key: "thirdStep",
      label: "My Third Step",
      isDone: false,
      component: <SecondComponent />,
    },
    {
      key: "finalStep",
      label: "My Final Step",
      isDone: false,
      component: <SecondComponent />,
    },
  ]);
  const [activeStep, setActiveStep] = useState(steps[0]);

  const employees: IEmployee[][] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const employeesArray = Object.values(employees);

  const getSelectedUser = () => {
    const selectedUser = employeesArray[0].find(
      (employee) => employee._id === userid
    );
    if (selectedUser) {
      dispatch(updatePersonBeingSurveyed(selectedUser._id));
    } else {
      console.log("Error: User could not be found");
    }
  };

  console.log(surveyPack.personBeingSurveyed);

  useEffect(() => {
    getSelectedUser();
  }, []);

  const handleNext = () => {
    if (steps[steps.length - 1].key === activeStep.key) {
      alert("You have completed all steps.");
      return;
    }

    const index = steps.findIndex((x) => x.key === activeStep.key);
    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = true;
        return x;
      })
    );
    setActiveStep(steps[index + 1]);
  };

  const handleBack = () => {
    const index = steps.findIndex((x) => x.key === activeStep.key);
    if (index === 0) return;

    setSteps((prevStep) =>
      prevStep.map((x) => {
        if (x.key === activeStep.key) x.isDone = false;
        return x;
      })
    );
    setActiveStep(steps[index - 1]);
  };

  return (
    <div className={classes.createForm_container}>
      <h4>Create Survey Pack</h4>
      <div className={classes.box}>
        <div className={classes.steps}>
          <ul className="nav">
            {steps.map((step, i) => {
              return (
                <li
                  key={i}
                  className={`${
                    activeStep.key === step.key ? classes.active : ""
                  } ${step.isDone ? classes.done : ""}`}
                >
                  <div>
                    Step {i + 1}
                    <br />
                    <span>{step.label}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={classes.step_component}>{activeStep.component}</div>
        <div className={classes.btn_component}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleBack}
            disabled={steps[0].key === activeStep.key}
          >
            Back
          </Button>
          <Button type="button" onClick={handleNext} variant="primary">
            {steps[steps.length - 1].key !== activeStep.key ? "Next" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
