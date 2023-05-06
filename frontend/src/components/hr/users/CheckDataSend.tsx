import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../app/store";
import { useAppSelector } from "../../../hooks/hooks";
import { IEmployee, ISurvey } from "../../../types/dataTypes";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import classes from "./CheckDataSent.module.css";

const CheckDataSend = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [selectedSurvey, setSelectedSurvey] = useState<ISurvey | null>(null);
  const [managerFirstName, setManagerFirstName] = useState("");
  const [managerLastName, setManagerLastName] = useState("");
  const [managerTitle, setManagerTitle] = useState("");
  const [managerImage, setManagerImage] = useState("");

  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const surveys: ISurvey[] = useAppSelector(
    (state: RootState) => state.surveys.surveys
  );
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

  useEffect(() => {
    if (personBeingSurveyed) {
      getSurveyedPerson(personBeingSurveyed);
    }
    if (manager) {
      getManager(manager);
    }
    if (survey) {
      getSelectedSurvey(survey);
    }
  }, [personBeingSurveyed, manager]);

  const getSurveyedPerson = (personId: string) => {
    const employee = employees.find((employee) => employee._id === personId);
    if (employee) {
      setFirstName(employee.firstName);
      setLastName(employee.surName);
      setTitle(employee.title);
      setImage(employee.image);
    }
  };

  const getManager = (personId: string) => {
    const employee = employees.find((employee) => employee._id === personId);
    if (employee) {
      setManagerFirstName(employee.firstName);
      setManagerLastName(employee.surName);
      setManagerTitle(employee.title);
      setManagerImage(employee.image);
    }
  };

  const getSelectedSurvey = (surveyId: string) => {
    const foundSurvey = surveys.find((survey) => survey._id === surveyId);
    if (foundSurvey) {
      setSelectedSurvey(foundSurvey);
    }
  };

  return (
    <div className={classes.survey_card}>
      <div className={classes.employee_card}>
        <h3>Selected employee</h3>
        <h4>
          <span>
            {firstName} {lastName}
          </span>
        </h4>
      </div>

      <div className={classes.manager_card}>
        <h3>Manager</h3>
        <h4>
          <span>
            {managerFirstName} {managerLastName}
          </span>
        </h4>
      </div>

      <div className={classes.survey_questions}>
        <h3>Survey Questions</h3>
        {selectedSurvey && (
          <>
            <p>Survey Name: {selectedSurvey.surveyName}</p>
            <p>Description: {selectedSurvey.description}</p>

            <ul>
              {selectedSurvey.questions.map((question, index) => (
                <li key={index}>
                  <strong>Category:</strong> {question.category}
                  <br />
                  <strong>Question {index + 1}:</strong> {question.question}
                  <br />
                  <strong>Type:</strong> {question.questionType}
                  <br />
                  <strong>Description:</strong> {question.description}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckDataSend;
