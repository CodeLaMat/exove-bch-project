import React, { useState } from "react";
import PageHeading from "../../pageHeading/PageHeading";
import axios from "axios";
import classes from "./AddQuestions.module.css";
import { setShowQuestionModal } from "../../../features/form/QuestionSlice";
import { useAppDispatch } from "../../../hooks/hooks";
import { initialiseQuestions } from "../../../features/survey/surveySlice";
import Button from "../../shared/button/Button";
import { useTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";

const AddQuestions: React.FC = () => {
  const { t } = useTranslation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
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

    axios
      .post("http://localhost:5010/api/v1/questions", formData)
      .then((response) => {
        // Add logic to handle the response if needed
      })
      .catch((error) => {
        console.error(error);
        // Add logic to handle the error if needed
      });
    dispatch(setShowQuestionModal(false));
  };

  return (
    <div className={classes.addQuestionForm_container}>
      <form className={classes.addQuestionForm_form} onSubmit={handleSubmit}>
        <label className={classes.addQuestionForm_label}>
          {t("Category")}:
          <select
            className={classes.addQuestionForm_select}
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">{t("Select a category")}</option>
            <option value="Quality focus">{t("Quality focus")}</option>
            <option value="People skills">{t("People skills")}</option>
            <option value="Self guidance">{t("Self guidance")}</option>
            <option value="Leadership">{t("Leadership")}</option>
            <option value="Readiness for change">
              {t("Readiness for change")}
            </option>
            <option value="Creativity">{t("Creativity")}</option>
            <option value="General Evaluation">
              {t("General Evaluation")}
            </option>
          </select>
        </label>

        <label className={classes.addQuestionForm_label}>
          {t("Question")}:
          <input
            className={classes.addQuestionForm_select}
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
          />
        </label>

        <label className={classes.addQuestionForm_label}>
          {t("Description")}:
          <textarea
            className={classes.addQuestionForm_select}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label className={classes.addQuestionForm_label}>
          {t("Question type")}:
          <select
            className={classes.addQuestionForm_select}
            name="questionType"
            value={formData.questionType}
            onChange={handleChange}
          >
            <option value="">{t("Select a question type")}</option>
            <option value="Multiple choice">{t("Multiple choice")}</option>
            <option value="Free form">{t("Free form")}</option>
          </select>
        </label>
        <Button variant="primary" type="submit">
          {t("Submit")}
        </Button>
      </form>
    </div>
  );
};

export default AddQuestions;
export default AddQuestions;
