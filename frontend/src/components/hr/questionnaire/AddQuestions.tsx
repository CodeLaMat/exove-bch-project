import React, { useState } from "react";
import PageHeading from "../../pageHeading/PageHeading";
import axios from "axios";
import classes from "./AddQuestions.module.css";
import { initialiseQuestions } from "../../../features/survey/surveySlice";
import Button from "../../shared/button/Button";

const AddQuestion: React.FC = () => {
  const [formData, setFormData] = useState({
    category: "",
    question: "",
    description: "",
    questionType: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitted", formData);

    axios
      .post("http://localhost:5010/api/v1/questions", formData)
      .then((response) => {
        console.log(response);
        // Add logic to handle the response if needed
      })
      .catch((error) => {
        console.error(error);
        // Add logic to handle the error if needed
      });
  };

  return (
    <div className={classes.addQuestionForm_container}>
      <form className={classes.addQuestionForm_form} onSubmit={handleSubmit}>
        <label className={classes.addQuestionForm_label}>
          Category:
          <select
            className={classes.addQuestionForm_select}
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="Quality focus">Quality focus</option>
            <option value="People skills">People skills</option>
            <option value="Self guidance">Self guidance</option>
            <option value="Leadership">Leadership</option>
            <option value="Readiness for change">Readiness for change</option>
            <option value="Creativity">Creativity</option>
            <option value="General Evaluation">General Evaluation</option>
          </select>
        </label>

        <label className={classes.addQuestionForm_label}>
          Question:
          <input
            className={classes.addQuestionForm_select}
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
          />
        </label>

        <label className={classes.addQuestionForm_label}>
          Description:
          <textarea
            className={classes.addQuestionForm_select}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label className={classes.addQuestionForm_label}>
          questionType:
          <select
            className={classes.addQuestionForm_select}
            name="questionType"
            value={formData.questionType}
            onChange={handleChange}
          >
            <option value="">Select a question type</option>
            <option value="Multiple choice">Multiple choice</option>
            <option value="Free form">Free form</option>
          </select>
        </label>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddQuestion;
