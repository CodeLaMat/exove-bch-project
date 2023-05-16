import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../pageHeading/PageHeading";
import classes from "./CreateSurvey.module.css";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Button from "../../shared/button/Button";
import Form from "react-bootstrap/Form";
import {
  IQuestion,
  SurveyFormData,
  QuestionsByCategory,
} from "../../../types/dataTypes";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setShowQuestionModal } from "../../../features/form/QuestionSlice";
import { Modal, Toast } from "react-bootstrap";
import AddQuestions from "../questionnaire/AddQuestions";
import { addSurvey } from "../../../features/survey/surveySlice";
import { useTranslation } from "react-i18next";

const CreateSurvey: React.FC = () => {
  const { t } = useTranslation();
  const { showQuestionModal } = useAppSelector((state) => state.question);
  const dispatch = useAppDispatch();
  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const [surveyName, setSurveyName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [checkedBoxes, setCheckedBoxes] = useState<string[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<SurveyFormData>({
    surveyName: "",
    description: "",
    questions: [],
  });
  const navigate = useNavigate();

  const handleShowModal = () => {
    dispatch(setShowQuestionModal(true));
  };
  const handleCloseModal = () => {
    dispatch(setShowQuestionModal(false));
  };

  useEffect(() => {
    axios
      .get<IQuestion[]>("http://localhost:5010/api/v1/questions")
      .then((response) => {
        setQuestionList(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Add logic to handle the error if needed
      });
  }, [setQuestionList, formData]);

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "surveyName") {
      setSurveyName(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = event.target;

    if (checked) {
      setCheckedBoxes([...checkedBoxes, value]);
    } else {
      setCheckedBoxes(checkedBoxes.filter((box) => box !== name));
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsFormSubmitted(true);
    const checkedquestions = checkedBoxes;
    const surveyQuestions = checkedquestions
      .map((checkedQuestion) => {
        return questionList.find(
          (question) => question._id === checkedQuestion
        );
      })
      .filter((question) => question) as IQuestion[];

    setFormData({
      surveyName: surveyName,
      description: description,
      questions: surveyQuestions,
    });
  };

  useEffect(() => {
    const sendSurvey = async (formData: SurveyFormData) => {
      try {
        await dispatch(addSurvey(formData));
      } catch (error) {
        console.error("Error submitting survey data:", error);
      } finally {
      }
    };
    if (
      formData.surveyName &&
      formData.description &&
      formData.questions.length > 0
    ) {
      sendSurvey(formData);
    }
  }, [formData, navigate, dispatch]);

  const questionsByCategory: QuestionsByCategory = questionList.reduce(
    (acc, question) => {
      const category = question.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(question);
      return acc;
    },
    {} as QuestionsByCategory
  );

  return (
    <div>
      {" "}
      <PageHeading pageTitle={t("Create Survey")} />{" "}
      <div className={classes.surveyCreate_container}>
        <div className={classes.back_button}>
          <Button variant="primary" onClick={() => navigate("/surveys")}>
            {t("Back")}
          </Button>
          <Button variant="primary" onClick={handleShowModal}>
            {t("Add Question")}
          </Button>
        </div>
        <div className={classes.top}>
          <div className={classes.surveyForm_container}>
            <form action="POST" onSubmit={submitHandler}>
              <label>
                {t("Survey Name")}:
                <input
                  type="text"
                  name="surveyName"
                  onChange={onchangeHandler}
                />
              </label>
              <label>
                {t("Description")}:
                <input
                  type="text"
                  name="description"
                  onChange={onchangeHandler}
                />
              </label>
              <Accordion
                defaultActiveKey={["0"]}
                alwaysOpen
                className={classes.Accordion}
              >
                {Object.entries(questionsByCategory).map(
                  ([category, questions], index) => (
                    <Accordion.Item eventKey={category} key={category}>
                      <Accordion.Header>{t(`${category}`)}</Accordion.Header>
                      <Accordion.Body>
                        <table className={classes.table}>
                          <thead>
                            <tr>
                              <th>{t("Question")}</th>
                              <th>{t("Question type")}</th>
                              <th>{t("Choose")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {questions.map((question) => (
                              <tr
                                key={question._id}
                                className={index % 2 === 0 ? "" : "highlight"}
                              >
                                <td className={classes.table_cell}>
                                  {t(`${question.question}`)}
                                </td>
                                <td className={classes.table_cell}>
                                  {t(`${question.questionType}`)}
                                </td>
                                <td className={classes.table_cell}>
                                  <Form.Check
                                    aria-label="option 1"
                                    type="checkbox"
                                    name={question._id}
                                    value={question._id}
                                    id={question._id}
                                    onChange={checkboxHandler}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Accordion.Body>
                    </Accordion.Item>
                  )
                )}
              </Accordion>
              <div className={classes.submit_button}>
                <Button type="submit" variant="primary">
                  {t("Submit")}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <Modal show={showQuestionModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{t("Add Question")}</Modal.Title>
            </Modal.Header>
            <AddQuestions />
            <Modal.Footer></Modal.Footer>
          </Modal>{" "}
          <Toast
            className={classes.toast}
            show={isFormSubmitted}
            autohide
            delay={3000}
            bg="info"
            onClose={() => {
              setIsFormSubmitted(false);
              navigate("/surveys");
            }}
          >
            <Toast.Header>
              <strong className="mr-auto">The Form Submitted</strong>
            </Toast.Header>
            <Toast.Body>
              The created form have been sent successfully.
            </Toast.Body>
          </Toast>
        </div>
      </div>
    </div>
  );
};

export default CreateSurvey;
