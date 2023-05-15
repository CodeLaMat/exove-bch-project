import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import SelectSurvey from "./SelectSurvey";
import classes from "./CreateForm.module.css";
import { RootState } from "../../../app/store";
import { IEmployee } from "../../../types/userTypes";
import { ICreateSurveyPack } from "../../../types/dataTypes";
import {
  createNewSurveyPack,
  setPersonBeingSurveyed,
} from "../../../features/survey/surveyPackSlice";
import SelectEmployee from "./SelectEmployee";
import Button from "../../shared/button/Button";
import { initialiseSurveyPacks } from "../../../features/survey/surveyPacksSlice";
import CheckDataSend from "./CheckDataSend";
import { useTranslation } from "react-i18next";
import { Toast } from "react-bootstrap";

const CreateForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { userid } = useParams<{ userid: string }>();
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
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
      setIsFormSubmitted(true);
    }
    setTimeout(() => {
      setIsFormSubmitted(false);
      navigate("/employees");
    }, 3000);
  };

  return (
    <div className={classes.createForm_container}>
      <h4>{t("Create Survey Pack")}</h4>
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
                  {t("Step")} {i + 1}
                  <br />
                  <span>{t(`${step.label}`)}</span>
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
            {t("Back")}
          </Button>
          <Button type="button" onClick={handleNext} variant="primary">
            {steps[steps.length - 1].key !== activeStep.key
              ? t("Next")
              : t("Submit")}
          </Button>
        </div>
        <Toast
          className={classes.toast}
          show={isFormSubmitted}
          autohide
          bg="info"
        >
          <Toast.Header>
            <strong className="mr-auto">The Form Submitted</strong>
          </Toast.Header>
          <Toast.Body>The created form have been sent successfully.</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default CreateForm;
