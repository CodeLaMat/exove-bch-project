import React, { useEffect } from "react";
import { UserRole } from "../../../enum";
import classes from "./Questionnaire.module.css";
import AddQuestion from "../../hr/questionnaire/AddQuestions";
import PageHeading from "../../pageHeading/PageHeading";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { RootState } from "../../../app/store";
import { setQuestions } from "../../../features/survey/surveySlice";

const Questionnaire = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.loginUser.userData);
  const role = userData[0].role.join("");
  
  const questions = useAppSelector(
    (state: RootState) => state.survey.questions
  );

  // const handleInitialiseQuestions = () => {
  //   dispatch(setQuestions(["Question 1"]));
  // };

  useEffect(() => {
    dispatch(setQuestions([]));
  }, [dispatch]);

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
