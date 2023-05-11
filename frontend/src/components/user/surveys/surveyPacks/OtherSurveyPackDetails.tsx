import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { RootState } from "../../../../app/store";
import {
  IEmployee,
  IParticipant,
  IQuestion,
  ISurvey,
  ISurveypack,
} from "../../../../types/dataTypes";
import classes from "./OtherSurveyPackDetails.module.css";
import Button from "../../../shared/button/Button";
import { Card, ListGroup, Form, Accordion } from "react-bootstrap";
import { useAppSelector } from "../../../../hooks/hooks";
import { Categories } from "../../../../types/dataTypes";

const OtherSurveyPackDetails: React.FC = () => {
  const { userpackid } = useParams();
  const [daysLeft, setDaysLeft] = useState<number>(0);

  const surveyPacks: ISurveypack[] = useAppSelector(
    (state: RootState) => state.surveyPacks.surveyPacks
  );
  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const surveys: ISurvey[] = useAppSelector(
    (state: RootState) => state.surveys.surveys
  );

  const surveysArray = Object.values(surveys);
  const surveyPacksArray = Object.values(surveyPacks);
  const cleanedSurveyPacks = Object.values(surveyPacksArray[0]);
  const surveyPack = cleanedSurveyPacks.find((pack) => pack._id === userpackid);

  const manager = employees.find((e) => e._id === surveyPack.manager);

  let questionsByCategory: { [key in Categories]: IQuestion[] } = {
    [Categories.QUALITY]: [],
    [Categories.PEOPLE_SKILLS]: [],
    [Categories.SELF_GUIDANCE]: [],
    [Categories.LEADERSHIP]: [],
    [Categories.READINESS_CHANGE]: [],
    [Categories.CREATIVITY]: [],
    [Categories.GENERAL]: [],
  };

  const foundSurveyPack: ISurveypack | undefined = cleanedSurveyPacks.find(
    (pack) => pack._id === userpackid
  );
  let survey: ISurvey | undefined;

  if (foundSurveyPack) {
    const surveyId: string = foundSurveyPack.survey;
    survey = surveysArray.find((s) => s._id === surveyId);
  }

  if (survey) {
    survey.questions.forEach((question) => {
      const category = question.category;
      if (questionsByCategory[category] !== undefined) {
        questionsByCategory[category].push(question);
      }
    });
  }

  useEffect(() => {
    const calculateDaysLeft = () => {
      if (!surveyPack) return; // Add this line
      const now = new Date();
      const deadline = new Date(surveyPack.deadline);
      const difference = deadline.getTime() - now.getTime();
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDaysLeft(days);
    };
    calculateDaysLeft();
    const intervalId = setInterval(calculateDaysLeft, 86400000);
    return () => clearInterval(intervalId);
  }, [surveyPack]);

  if (!surveyPack) {
    return <div>Survey pack not found</div>;
  }

  console.log("current");
  console.log("found", foundSurveyPack);

  const personBeingSurveyed = employees.find(
    (e) => e._id === surveyPack.personBeingSurveyed
  );

  const participantNames = surveyPack.employeesTakingSurvey
    ?.map((participant: IParticipant) => {
      const foundEmployee = employees.find(
        (e) => e._id === participant.employee
      );
      return foundEmployee
        ? `${foundEmployee.firstName} ${foundEmployee.surName}`
        : null;
    })
    .filter((name: string) => name)
    .join(", ");

  console.log("Participant Names", surveyPack.employeesTakingSurvey);
  return (
    <div className={classes.surveyPackDetails}>
      <Card style={{ maxWidth: "80rem" }}>
        <Card.Header className="text-center" style={{ fontSize: "30px" }}>
          Survey Pack Details
        </Card.Header>
        <Card.Body>
          <Card.Title> Person Being Surveyed:</Card.Title>
          <Card.Text>
            {personBeingSurveyed?.firstName +
              " " +
              personBeingSurveyed?.surName}
          </Card.Text>{" "}
          <Card.Footer className="text-muted">
            {daysLeft > 0
              ? `Days left until deadline: ${daysLeft}`
              : "Deadline has passed"}
          </Card.Footer>
          <ListGroup key="xxl" horizontal="xxl" className="my-2">
            <ListGroup.Item style={{ width: "30rem" }}>
              Created at:
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              {new Date(surveyPack.createdAt).toLocaleDateString()}
            </ListGroup.Item>
          </ListGroup>{" "}
          <ListGroup key="xxl" horizontal="xxl" className="my-2">
            <ListGroup.Item style={{ width: "30rem" }}>
              Deadline:{" "}
            </ListGroup.Item>
            <ListGroup.Item variant={daysLeft > 0 ? "info" : "danger"}>
              {new Date(surveyPack.deadline).toLocaleDateString()}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup key="xxl" horizontal="xxl" className="my-2">
            <ListGroup.Item style={{ width: "30rem" }}>Status: </ListGroup.Item>
            <ListGroup.Item variant="info">{surveyPack.status}</ListGroup.Item>
          </ListGroup>
          <ListGroup key="xxl" horizontal="xxl" className="my-2">
            <ListGroup.Item style={{ width: "30rem" }}>
              Manager:{" "}
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              {manager?.firstName + "" + manager?.surName}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup key="xxl" horizontal="xxl" className="my-2">
            <ListGroup.Item style={{ width: "30rem" }}>
              Manager Approved:{" "}
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              {surveyPack.managerapproved ? "Yes" : "No"}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup key="xxl" horizontal="xxl" className="my-2">
            <ListGroup.Item style={{ width: "30rem" }}>
              HR Approved:{" "}
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              {surveyPack.hrapproved ? "Yes" : "No"}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup key="xxl" horizontal="xxl" className="my-2">
            <ListGroup.Item style={{ width: "30rem" }}>
              Participants of this survey:{" "}
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              {participantNames
                ? participantNames
                : "No participants assigned yet"}
            </ListGroup.Item>
          </ListGroup>{" "}
        </Card.Body>

        <Card.Body>
          <Card>
            {survey && (
              <div className={classes.surveyCard} key={survey._id}>
                <Card.Header>
                  <h3>{survey.surveyName}</h3>
                </Card.Header>
                <div className={classes.descriptionBox}>
                  <h5>Description:</h5>
                  <p>{survey.description}</p>
                </div>
                <Card.Body>
                  <h4>Questions:</h4>
                  <Accordion defaultActiveKey="0">
                    {Object.entries(questionsByCategory).map(
                      ([category, questions], index) => (
                        <Accordion.Item key={category} eventKey={`${index}`}>
                          <Accordion.Header>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <h5>{category}</h5>
                              <span>
                                {questions.length}{" "}
                                {questions.length === 1
                                  ? "question"
                                  : "questions"}
                              </span>
                            </div>
                          </Accordion.Header>

                          <Accordion.Body>
                            <ListGroup variant="flush">
                              {questions.map((question, qIndex) => (
                                <ListGroup.Item
                                  key={qIndex}
                                  className="my-3"
                                  style={{ fontSize: "20px" }}
                                >
                                  {/* Add the question number here */}
                                  {qIndex + 1}. {question.question}
                                  {question.questionType ===
                                  "Multiple choice" ? (
                                    <Form>
                                      <Form.Group
                                        controlId={`range-${qIndex}`}
                                        className="my-4"
                                      >
                                        <Form.Label>
                                          <span
                                            className={
                                              classes.questionDescription
                                            }
                                          >
                                            {" "}
                                            Evaluation from 1 to 5
                                          </span>
                                        </Form.Label>
                                        <Form.Control
                                          type="range"
                                          min="1"
                                          max="5"
                                          defaultValue="3"
                                          className="my-4"
                                        />
                                      </Form.Group>
                                    </Form>
                                  ) : (
                                    <Form>
                                      <Form.Group controlId="formBasicText">
                                        <Form.Control
                                          type="text"
                                          placeholder="Enter your answer"
                                          className="my-4"
                                        />
                                      </Form.Group>
                                    </Form>
                                  )}
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                          </Accordion.Body>
                        </Accordion.Item>
                      )
                    )}
                  </Accordion>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Card.Body>
              </div>
            )}
          </Card>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OtherSurveyPackDetails;
