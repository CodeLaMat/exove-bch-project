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
import { Modal } from "react-bootstrap";
import AddQuestions from "../questionnaire/AddQuestions";
import { initialiseSurveys } from "../../../features/survey/surveysSlice";
import { addSurvey } from "../../../features/survey/surveySlice";

const CreateSurvey: React.FC = () => {
  const { showQuestionModal } = useAppSelector((state) => state.question);
  const dispatch = useAppDispatch();
  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const [surveyName, setSurveyName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [checkedBoxes, setCheckedBoxes] = useState<string[]>([]);
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
  }, [setQuestionList]);

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

  const sendSurvey = async (formData: SurveyFormData) => {
    try {
      await dispatch(addSurvey(formData));
      console.log("Survey data submitted successfully!");
      navigate("/surveys");
    } catch (error) {
      console.error("Error submitting survey data:", error);
    }
  };
  useEffect(() => {
    if (
      formData.surveyName &&
      formData.description &&
      formData.questions.length > 0
    ) {
      sendSurvey(formData);
    }
  }, [formData, navigate]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

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
    <div className={classes.surveyCreate_container}>
      <PageHeading pageTitle="Create Survey" />{" "}
      <div className={classes.back_button}>
        <Button variant="primary" onClick={() => navigate("/surveys")}>
          Back
        </Button>
        <Button variant="primary" onClick={handleShowModal}>
          Add Question
        </Button>
      </div>
      <div className={classes.top}>
        <div className={classes.surveyForm_container}>
          <form action="POST" onSubmit={submitHandler}>
            <label>
              Survey Name:
              <input type="text" name="surveyName" onChange={onchangeHandler} />
            </label>
            <label>
              Description:
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
                    <Accordion.Header>{category}</Accordion.Header>
                    <Accordion.Body>
                      <table className={classes.table}>
                        <thead>
                          <tr>
                            <th>Question</th>
                            <th>Question type</th>
                            <th>Choose</th>
                          </tr>
                        </thead>
                        <tbody>
                          {questions.map((question) => (
                            <tr
                              key={question._id}
                              className={index % 2 === 0 ? "" : "highlight"}
                            >
                              <td className={classes.table_cell}>
                                {question.question}
                              </td>
                              <td className={classes.table_cell}>
                                {question.questionType}
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
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Modal show={showQuestionModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add a question</Modal.Title>
          </Modal.Header>
          <AddQuestions />
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CreateSurvey;
