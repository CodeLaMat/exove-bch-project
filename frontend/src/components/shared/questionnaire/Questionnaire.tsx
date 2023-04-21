import React, { useEffect } from "react";
import { UserRole } from "../../../enum";
import classes from "./Questionnaire.module.css";
import AddQuestion from "../../hr/questionnaire/AddQuestions";
import PageHeading from "../../pageHeading/PageHeading";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { RootState } from "../../../app/store";
import QuestionMult from "../../hr/questionnaire/QuestionMult";
import QuestionForm from "../../hr/questionnaire/QuestionForm";
import { setQuestions } from "../../../features/survey/surveySlice";

const Questionnaire = () => {
  const dispatch = useAppDispatch();
  const { selectedRole } = useAppSelector((state) => state.loginUser);
  const questions = useAppSelector(
    (state: RootState) => state.survey.questions
  );

  // const handleInitialiseQuestions = () => {
  //   dispatch(setQuestions(["Question 1"]));
  // };

  const userData = useAppSelector((state) => state.loginUser.userData);
  const user = userData[0];
  const role = user.role.join("");

  useEffect(() => {
    dispatch(setQuestions([]));
  }, [dispatch]);

  console.log(questions);

  if (role === UserRole.HR) {
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
