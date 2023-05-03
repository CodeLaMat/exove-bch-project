import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useParams } from "react-router-dom";
import SelectSurvey from "./SelectSurvey";
import classes from "./CreateForm.module.css";
import { RootState } from "../../../app/store";
import { IEmployee } from "../../../types/userTypes";
import { ISurveypack } from "../../../types/dataTypes";
import { updatePersonBeingSurveyed } from "../../../features/survey/surveyPacksSlice";
import SelectEmployee from "./SelectEmployee";
import SelectParticipants from "./SelectParticipants";
import Button from "../../shared/button/Button";
import { initialiseSurveyPacks } from "../../../features/survey/surveyPacksSlice";

const CreateForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userid } = useParams<{ userid: string }>();
  const surveyPacks = useAppSelector(
    (state: RootState) => state.surveyPacks.surveyPacks
  );

  const [steps, setSteps] = useState([
    {
      key: "firstStep",
      label: "Select employee",
      isDone: true,
      component: <SelectEmployee />,
    },
    {
      key: "thirdStep",
      label: "Select survey",
      isDone: false,
      component: <SelectSurvey />,
    },
    {
      key: "secondStep",
      label: "Select Participants",
      isDone: false,
      component: <SelectParticipants />,
    },
    {
      key: "finalStep",
      label: "My Final Step",
      isDone: false,
      component: <SelectSurvey />,
    },
  ]);
  const [activeStep, setActiveStep] = useState(steps[0]);

  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const employeesArray = Object.values(employees);

  const getSelectedUser = () => {
    const selectedUser = employeesArray.find(
      (employee) => employee._id === userid
    );
    if (selectedUser) {
      dispatch(
        updatePersonBeingSurveyed({
          surveyPackId: surveyPacks[0]?._id ?? "",
          personBeingSurveyed: selectedUser._id,
        })
      );
    } else {
      console.log("Error: User could not be found");
    }
  };

  console.log(surveyPacks[0]?.personBeingSurveyed);

  useEffect(() => {
    dispatch(initialiseSurveyPacks());
    getSelectedUser();
  }, [dispatch, userid]);

  const handleNext = () => {
    const index = steps.findIndex((x) => x.key === activeStep.key);
    if (index < steps.length - 1) {
      setActiveStep(steps[index + 1]);
    } else {
      alert("You have completed all steps.");
    }
  };

  const handleBack = () => {
    const index = steps.findIndex((x) => x.key === activeStep.key);
    if (index > 0) {
      setActiveStep(steps[index - 1]);
    }
  };

  return (
    <div className={classes.createForm_container}>
      <h4>Create Survey Pack</h4>
      <div className={classes.box}>
        <div className={classes.steps}>
          <ul className="nav">
            {steps.map((step, i) => (
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
            ))}
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
