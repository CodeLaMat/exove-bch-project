import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import SelectSurvey from "./SelectSurvey";
import classes from "./CreateForm.module.css";
import { RootState } from "../../../app/store";
import { IEmployee } from "../../../types/userTypes";
import {
  ICreateSurveyPack,
  ISurveypack,
  SurveyPackStatus,
} from "../../../types/dataTypes";
import {
  createNewSurveyPack,
  setPersonBeingSurveyed,
} from "../../../features/survey/surveyPackSlice";
import SelectEmployee from "./SelectEmployee";
import SelectParticipants from "./SelectParticipants";
import Button from "../../shared/button/Button";
import { initialiseSurveyPacks } from "../../../features/survey/surveyPacksSlice";
import CheckDataSend from "./CheckDataSend";

const CreateForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userid } = useParams<{ userid: string }>();
  const userId = userid ?? "";
  const surveyPack = useAppSelector(
    (state: RootState) => state.surveyPack.surveyPack
  );
  const {
    personBeingSurveyed,
    survey,
    employeesTakingSurvey,
    deadline,
    status,
    manager,
    managerapproved,
    hrapproved,
  } = surveyPack;

  console.log("Person being surveyed", personBeingSurveyed);
  console.log("Manager", manager);
  console.log("Survey", survey);

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
    // {
    //   key: "secondStep",
    //   label: "Select Participants",
    //   isDone: false,
    //   component: <SelectParticipants />,
    // },
    {
      key: "finalStep",
      label: "Check Data",
      isDone: false,
      component: <CheckDataSend />,
    },
  ]);
  const [activeStep, setActiveStep] = useState(steps[0]);
  const handleNext = () => {
    dispatch(setPersonBeingSurveyed(userId));
    const index = steps.findIndex((x) => x.key === activeStep.key);
    if (index < steps.length - 1) {
      setActiveStep(steps[index + 1]);
    } else {
      if (steps[steps.length - 1].key === activeStep.key) {
        handleFormSendClick(userId);
      } else {
        alert("You have completed all steps.");
      }
    }
  };
  const handleBack = () => {
    const index = steps.findIndex((x) => x.key === activeStep.key);
    if (index > 0) {
      setActiveStep(steps[index - 1]);
    }
  };

  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );

  useEffect(() => {
    dispatch(initialiseSurveyPacks());
  }, [dispatch, userid]);

  const currentDate = new Date();
  // const deadline = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  const handleFormSendClick = (userid: string) => {
    const selectedEmployee = employees.find(
      (employee) => employee._id === userid
    );
    if (selectedEmployee) {
      const newSurveyPack: ICreateSurveyPack = {
        personBeingSurveyed: personBeingSurveyed,
        survey: survey,
        employeesTakingSurvey: employeesTakingSurvey,
        deadline: deadline,
        status: status,
        manager: manager,
        managerapproved: managerapproved,
        hrapproved: hrapproved,
      };
      dispatch(createNewSurveyPack(newSurveyPack));
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
