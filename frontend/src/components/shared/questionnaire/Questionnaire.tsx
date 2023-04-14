import React, { useEffect } from "react";
import { UserRole } from "../../../enum";
import classes from "./HRQuestionnaire.module.css";
import AddQuestion from "../../hr/questionnaire/AddQuestions";
import PageHeading from "../../pageHeading/PageHeading";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../src/redux/hooks/hooks";
import { RootState } from "../../../redux/store";
import QuestionMult from "../../hr/questionnaire/QuestionMult";
import { setQuestions } from "../../../redux/reducers/survey/surveySlice";
import QuestionForm from "../../hr/questionnaire/QuestionForm";

const Questionnaire = () => {
  const dispatch = useAppDispatch();
  const { selectedRole } = useAppSelector((state) => state.loginUser);
  const questions = useAppSelector(
    (state: RootState) => state.survey.questions
  );

  // const handleInitialiseQuestions = () => {
  //   dispatch(setQuestions(["Question 1"]));
  // };

  useEffect(() => {
    dispatch(setQuestions([]));
  }, [dispatch]);

  console.log(questions);

  if (selectedRole === UserRole.HR) {
    return (
      <div className={classes.questionnaire_container}>
        <PageHeading pageTitle="Questionnaire" />
        <div>
          <AddQuestion />
        </div>
      </div>
    );
  } else return null;
};

export default Questionnaire;
