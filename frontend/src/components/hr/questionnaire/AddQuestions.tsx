import React, { useState } from "react";
import PageHeading from "../../pageHeading/PageHeading";
import axios from "axios";
import { initialiseQuestions } from "../../../redux/reducers/form/formSlice";

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
    <div>
      <PageHeading pageTitle="Questionnaire" />
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select
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

        <label>
          Question:
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label>
          questionType:
          <select
            name="questionType"
            value={formData.questionType}
            onChange={handleChange}
          >
            <option value="">Select a question type</option>
            <option value="Multiple choice">Multiple choice</option>
            <option value="Free form">Free form</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddQuestion;
