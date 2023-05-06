import React, { useEffect } from "react";
import { UserRole } from "../../../enum";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../pageHeading/PageHeading";
import classes from "./Surveys.module.css";
import { Modal, Table } from "react-bootstrap";
import Button from "../../shared/button/Button";
import { ISurvey } from "../../../types/dataTypes";
import { RootState } from "../../../app/store";
import { removeSurvey } from "../../../features/survey/surveysSlice";
import { initialiseSurveys } from "../../../features/survey/surveysSlice";
import { setShowQuestionModal } from "../../../features/form/QuestionSlice";
import AddQuestion from "../../hr/questionnaire/AddQuestions";
import axios from "axios";

const Surveys = () => {
  const { showQuestionModal } = useAppSelector((state) => state.question);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.loginUser.userData);
  const role = userData[0].role.join("");

  const surveys: ISurvey[] = useAppSelector(
    (state: RootState) => state.surveys.surveys
  );
  const surveysArray = Object.values(surveys);

  console.log(surveysArray);

  useEffect(() => {
    dispatch(initialiseSurveys());
  }, [dispatch]);

  const handleShowModal = () => {
    dispatch(setShowQuestionModal(true));
  };
  const handleCloseModal = () => {
    dispatch(setShowQuestionModal(false));
  };

  const handleDelete = (surveyId: string) => {
    dispatch(removeSurvey(surveyId));
  };

  if (role === UserRole.HR) {
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
              </Button>{" "}
              <Button variant="primary" onClick={handleShowModal}>
                Add Question
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
                  {surveysArray.map((survey: ISurvey) => (
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
        <div>
          <Modal show={showQuestionModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add a question</Modal.Title>
            </Modal.Header>
            <AddQuestion />
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
  return null;
};

export default Surveys;
