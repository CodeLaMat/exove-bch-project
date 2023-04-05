import React, { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import PageHeading from "../../pageHeading/PageHeading";
import classes from "./SurveyChoice.module.css";
import axios from "axios";
import { SurveyData } from "../../../redux/reducers/form/formSlice";
import { Button, Table } from "react-bootstrap";

const SurveyChoice = () => {
  const navigate = useNavigate();
  const [surveyList, setsurveyList] = useState<SurveyData[]>([]);

  useEffect(() => {
    axios
      .get<SurveyData[]>("http://localhost:5000/list/surveys")
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
      <PageHeading pageTitle="Created Surveys" />
      <div className={classes.top}>
        <div className={classes.maincontent}>
          <div>
            <Button variant="primary" onClick={() => navigate("/createsurvey")}>
              Create Survey
            </Button>
          </div>
          <div className={classes.top}>
            <div className={classes.maincontent}>
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
                      <td>{survey.name}</td>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyChoice;
