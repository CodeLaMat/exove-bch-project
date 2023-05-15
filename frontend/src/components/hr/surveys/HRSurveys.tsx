import React, { useEffect } from "react";
import { UserRole } from "../../../enum";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../pageHeading/PageHeading";
import classes from "./HRSurveys.module.css";
import {
  Modal,
  Table,
  Dropdown,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import Button from "../../shared/button/Button";
import { ISurvey } from "../../../types/dataTypes";
import { RootState } from "../../../app/store";
import { removeSurvey } from "../../../features/survey/surveysSlice";
import { initialiseSurveys } from "../../../features/survey/surveysSlice";
import { setShowQuestionModal } from "../../../features/form/QuestionSlice";
import AddQuestion from "../questionnaire/AddQuestions";
import { useTranslation } from "react-i18next";

const HRSurveys = () => {
  const { showQuestionModal } = useAppSelector((state) => state.question);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userData = useAppSelector((state) => state.loginUser.userData);
  const role = userData[0].role.join("");

  const surveys: ISurvey[] = useAppSelector(
    (state: RootState) => state.surveys.surveys
  );
  const surveysArray = Object.values(surveys);

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
      <div>
        <PageHeading pageTitle={t("Survey forms")} />
        <div className={classes.surveys_container}>
          <div className={classes.top}>
            <div className={classes.maincontent}>
              <div className={classes.actions}>
                <Button
                  variant="primary"
                  onClick={() => navigate("/createsurvey")}
                >
                  {t("Create new Form")}
                </Button>{" "}
                <Button variant="primary" onClick={handleShowModal}>
                  {t("Add Question")}
                </Button>
              </div>
              <div className={classes.table_container}>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>{t("Survey Name")}</th>
                      <th>{t("Description")}</th>
                      <th>{t("Questions")}</th>
                      <th>{t("Delete")} </th>
                    </tr>
                  </thead>
                  <tbody>
                    {surveysArray.map((survey: ISurvey, index) => (
                      <tr key={survey._id}>
                        <td>{index + 1}</td>
                        <td>{survey.surveyName}</td>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id={`tooltip-${survey._id}`}>
                              {survey.description}
                            </Tooltip>
                          }
                        >
                          <td
                            className="text-truncate"
                            style={{ maxWidth: "900px" }}
                          >
                            {survey.description}
                          </td>
                        </OverlayTrigger>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="secondary"
                              id="dropdown-basic"
                            >
                              {t("View Questions")}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {survey.questions.map((question) => (
                                <Dropdown.Item key={question._id}>
                                  {question.question}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            type="button"
                            onClick={() => handleDelete(survey._id)}
                          >
                            {t("Delete")}
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
                <Modal.Title>{t("Add Question")}</Modal.Title>
              </Modal.Header>
              <AddQuestion />
              <Modal.Footer></Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default HRSurveys;
