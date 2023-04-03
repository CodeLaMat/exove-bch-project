import React, { useState, useEffect } from 'react';
import PageHeading from '../../pageHeading/PageHeading';
import classes from './CreateSurvey.module.css'
import axios from 'axios';

interface Question {
  _id: string;
  question: string;
  category: string,
  description: string,
  questionType: string,
}

interface FormData {
  surveyName: string;
  description: string;
  questions: Question[];
}

const CreateSurvey: React.FC = () => {
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [surveyName, setSurveyName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [checkedBoxes, setCheckedBoxes] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    surveyName: "",
    description: "",
    questions: [],
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    axios.get<Question[]>("http://localhost:5010/api/v1/questions")
      .then(response => {
        setQuestionList(response.data);
      })
      .catch(error => {
        console.error(error);
        // Add logic to handle the error if needed
      });

      if (formSubmitted) {
        console.log("formData: ", formData);
      }

  }, [setQuestionList, formSubmitted, formData])

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //   setSurvey({ ...survey, [e.target.name]: e.target.value })
    if (e.target.name === "surveyName") {
      setSurveyName(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  }

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

    const surveyQuestions = checkedquestions.map((checkedQuestion) => {
      return questionList.find((question) => question._id === checkedQuestion);
    }).filter(question => question) as Question[];
    
    console.log("surveyQuestions: ", surveyQuestions);
    setFormData((prevState) => ({
      ...prevState,
      surveyName: surveyName,
      description: description,
      questions: surveyQuestions,
    }));

    const endpointUrl = 'http://localhost:5010/api/v1/surveys';

    // Make the POST request with Axios
    axios.post(endpointUrl, formData)
      .then(response => {
        console.log('Survey data submitted successfully!');
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error submitting survey data:', error);
      });

  }

  

  return (
    <div>
      <PageHeading
        pageTitle="Create Survey"
      />
      <div className={classes.top}>
        <div className={classes.maincontent}>
          <form action="POST" onSubmit={submitHandler}>
            <label>
              Survey Name:
              <input type="text" name="surveyName" onChange={onchangeHandler} />
            </label>
            <label>
              Description:
              <input type="text" name="description" onChange={onchangeHandler} />
            </label>
            <div>
              {questionList.map((question, i) => (
                <div key={question._id}>
                  <label htmlFor={question._id}>{question.question}</label>
                  <input type="checkbox" name={question._id} value={question._id} onChange={checkboxHandler} />
                </div>
              ))}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSurvey;