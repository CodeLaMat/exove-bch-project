import React, { useEffect, useState } from "react";
import classes from "./HRDashboard.module.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import { ISurvey } from "../../../types/dataTypes";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../app/store";
import { initialiseSurveys } from "../../../features/survey/surveysSlice";

const DBSurveyList = () => {
  const dispatch = useAppDispatch();
  const [surveyList, setsurveyList] = useState<ISurvey[]>([]);
  const surveys: ISurvey[] = useAppSelector(
    (state: RootState) => state.surveys
  );
  

  // useEffect(() => {
  //   dispatch(initialiseSurveys());
  // }, [dispatch]);

  useEffect(() => {
    axios.get("http://localhost:5010/api/v1/surveys")
      .then((response) => {
        console.log("surveyResponse", response.data.surveyList);
        setsurveyList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setsurveyList]);

  console.log("surveyList", surveyList);
  const entries = Object.values(surveys);

  console.log("entries", entries);

  return (
    <div className={classes.surveys_container}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Survey ID</th>
            <th>Survey Name</th>
            <th>Description</th>
            <th>Questions</th>
          </tr>
        </thead>
        <tbody>
          {surveyList.map((survey: ISurvey) => (
            <tr key={survey._id}>
              <td>{survey._id}</td>
              <td>{survey.surveyName}</td>
              <td>{survey.description}</td>
              <td>
                <ul>
                  {survey.questions.map((question) => (
                    <li key={question._id}>{question.question}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DBSurveyList;
