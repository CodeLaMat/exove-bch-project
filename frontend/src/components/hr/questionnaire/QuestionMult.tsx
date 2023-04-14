import React from "react";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { Card } from "react-bootstrap";
import { RootState } from "../../../redux/store";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../src/redux/hooks/hooks";
import { initialiseQuestions } from "../../../redux/reducers/survey/surveySlice";
import { IQuestion } from "../../../redux/types/dataTypes";

function QuestionMult() {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(
    (state: RootState) => state.survey.questions
  );
  const survey = useAppSelector((state: RootState) => state.survey.survey);
  const { selectedRole } = useAppSelector((state) => state.loginUser);
  console.log(questions);

  return (
    <div>
      {questions.map((questtions: IQuestion) => (
        <Card>
          <Card.Body>{questions.question}</Card.Body>
          <div key={`inline-$"radio"`} className="mb-3">
            <Form.Check
              inline
              label="1"
              name="group1"
              type="radio"
              id={`inline-$"radio"-1`}
            />
            <Form.Check
              inline
              label="2"
              name="group1"
              type="radio"
              id={`inline-$"radio"-2`}
            />
            <Form.Check
              inline
              name="group1"
              label="3"
              type="radio"
              id={`inline-$"radio"-3`}
            />
            <Form.Check
              inline
              label="4"
              name="group1"
              type="radio"
              id={`inline-$"radio"-4`}
            />
            <Form.Check
              inline
              label="5"
              name="group1"
              type="radio"
              id={`inline-$"radio"-5`}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default QuestionMult;
