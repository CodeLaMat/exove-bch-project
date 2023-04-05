import React, { useEffect } from "react";
import classes from "./HRQuestionnaire.module.css";
import AddQuestion from "./AddQuestions";
import PageHeading from "../../pageHeading/PageHeading";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../src/redux/hooks/hooks";
import { RootState } from "../../../redux/store";
import QuestionMult from "./QuestionMult";
import { setQuestions } from "../../../redux/reducers/survey/surveySlice";
import QuestionForm from "./QuestionForm";

const Questionnaire = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(
    (state: RootState) => state.survey.questions
  );

  const handleInitialiseQuestions = () => {
    dispatch(setQuestions(["Question 1"]));
  };

  useEffect(() => {
    dispatch(setQuestions([]));
  }, [dispatch]);

  console.log(questions);

  return (
    <div className={classes.questionnaire_container}>
      <PageHeading pageTitle="Questionnaire" />
      <div>
        <AddQuestion />
        <QuestionForm />
      </div>
    </div>
  );
};

export default Questionnaire;
