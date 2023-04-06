import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../pageHeading/PageHeading";
import classes from "./CreateSurvey.module.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { QuestionProps } from "../../../redux/types/dataTypes";

interface FormData {
  surveyName: string;
  description: string;
  questions: QuestionProps[];
}

const CreateSurvey: React.FC = () => {
  const [questionList, setQuestionList] = useState<QuestionProps[]>([]);
  const [surveyName, setSurveyName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [checkedBoxes, setCheckedBoxes] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    surveyName: "",
    description: "",
    questions: [],
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<QuestionProps[]>("http://localhost:5010/api/v1/questions")
      .then((response) => {
        setQuestionList(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Add logic to handle the error if needed
      });

    if (formSubmitted) {
      console.log("formData: ", formData);
    }
  }, [setQuestionList, formSubmitted, formData]);

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //   setSurvey({ ...survey, [e.target.name]: e.target.value })
    if (e.target.name === "surveyName") {
      setSurveyName(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value, id } = event.target;

    if (checked) {
      setCheckedBoxes([...checkedBoxes, value]);
      console.log("question list: ", questionList);
      console.log("value: ", value);
    } else {
      setCheckedBoxes(checkedBoxes.filter((box) => box !== name));
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setFormSubmitted(true);
    console.log("checkedBoxes: ", checkedBoxes);
    const checkedquestions = checkedBoxes;
    console.log("checkedquestions: ", checkedquestions);
    console.log("surveyName: ", surveyName);
    console.log("description: ", description);

    const surveyQuestions = checkedquestions
      .map((checkedQuestion) => {
        return questionList.find(
          (question) => question._id === checkedQuestion
        );
      })
      .filter((question) => question) as QuestionProps[];

    console.log("surveyQuestions: ", surveyQuestions);
    setFormData((prevState) => ({
      ...prevState,
      surveyName: surveyName,
      description: description,
      questions: surveyQuestions,
    }));

    const endpointUrl = "http://localhost:5010/api/v1/surveys";

    // Make the POST request with Axios
    axios
      .post(endpointUrl, formData)
      .then((response) => {
        console.log("Survey data submitted successfully!");
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting survey data:", error);
      });
  };

  return (
    <div>
      {" "}
      <div className={classes.back_button}>
        <Button variant="primary" onClick={() => navigate("/surveys")}>
          Back
        </Button>
      </div>
      <div className={classes.surveyCreate_container}>
        {" "}
        <PageHeading pageTitle="Create Survey" />{" "}
        <div className={classes.top}>
          <div className={classes.surveyForm_container}>
            <form action="POST" onSubmit={submitHandler}>
              <label>
                Survey Name:
                <input
                  type="text"
                  name="surveyName"
                  onChange={onchangeHandler}
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  onChange={onchangeHandler}
                />
              </label>
              <div>
                {questionList.map((question, i) => (
                  <div key={question._id}>
                    <label htmlFor={question._id}>{question.question}</label>
                    <input
                      type="checkbox"
                      name={question._id}
                      value={question._id}
                      onChange={checkboxHandler}
                    />
                  </div>
                ))}
              </div>

              <Button type="submit" variant="success">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSurvey;
