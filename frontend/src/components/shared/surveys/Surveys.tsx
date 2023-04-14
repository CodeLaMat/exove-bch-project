import React, { useEffect, useState } from "react";
import { UserRole } from "../../../enum";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../pageHeading/PageHeading";
import classes from "./Surveys.module.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import Button from "../../shared/button/Button";
import { ISurvey } from "../../../types/dataTypes";
import { removeSurvey } from "../../../features/survey/surveysSlice";

const Surveys = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [surveyList, setsurveyList] = useState<ISurvey[]>([]);
  const { selectedRole } = useAppSelector((state) => state.loginUser);

  useEffect(() => {
    axios
      .get<ISurvey[]>("http://localhost:5010/api/v1/surveys")
      .then((response) => {
        setsurveyList(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Add logic to handle the error if needed
      });
  }, [setsurveyList]);

  const handleDelete = (surveyId: string) => {
    dispatch(removeSurvey(surveyId));
  };

  if (selectedRole === UserRole.HR) {
    return (
      <div className={classes.surveys_container}>
        <PageHeading pageTitle="Survey forms" />
        <div className={classes.top}>
          <div className={classes.maincontent}>
            <div className={classes.actions}>
              <Button
                variant="primary"
                onClick={() => navigate("/createsurvey")}
              >
                Create new Form
              </Button>
            </div>
            <div className={classes.table_container}>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Survey ID</th>
                    <th>Survey Name</th>
                    <th>Description</th>
                    <th>Questions</th>
                    <th>Delete </th>
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
                      <td>
                        <Button
                          variant="primary"
                          type="button"
                          onClick={() => handleDelete(survey._id)}
                        >
                          Delete Form
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default Surveys;
