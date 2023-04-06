import React, { useEffect, useState } from "react";
import classes from "./HRDashboard.module.css";
import axios from "axios";
import { SurveyData } from "../../../redux/reducers/form/formSlice";
import { Table } from "react-bootstrap";

const DBEmplList = () => {
  const [surveyList, setsurveyList] = useState<SurveyData[]>([]);

  useEffect(() => {
    axios
      .get<SurveyData[]>("http://localhost:5010/api/v1/surveys")
      .then((response) => {
        setsurveyList(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Add logic to handle the error if needed
      });
  }, [setsurveyList]);

  console.log(surveyList);

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
          {surveyList.map((survey: SurveyData) => (
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

export default DBEmplList;
