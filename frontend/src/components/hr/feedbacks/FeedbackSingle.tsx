import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { RootState } from "../../../app/store";
import {
  IEmployee,
  IParticipant,
  IQuestion,
  ISurvey,
  ISurveypack,
} from "../../../types/dataTypes";
import classes from "./FeedbackSingle.module.css";
import Button from "../../shared/button/Button";
import { Card, ListGroup, Accordion } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { Categories } from "../../../types/dataTypes";
import PageHeading from "../../pageHeading/PageHeading";
import { useTranslation } from "react-i18next";
import { sendReminderEmailToUser } from "../../../features/survey/surveyPacksSlice";
import { IParticipantInput } from "../../../types/dataTypes";

const FeedbackSingle: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { packid } = useParams();
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [replacementParticipant, setReplacementParticipant] = useState<
    string | undefined
  >(undefined);

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
  const surveyPack = cleanedSurveyPacks.find((pack) => pack._id === packid);

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
    (pack) => pack._id === packid
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
      if (!surveyPack) return;
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

  const handleSendReminderEmail = (
    surveyPackId: string,
    personBeingSurveyedId: string
  ) => {
    dispatch(
      sendReminderEmailToUser({
        surveyPackId,
        personBeingSurveyed: personBeingSurveyedId,
      })
    );
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
    }, 3000);
  };

  const handleReplaceParticipant = (declinedParticipant: IParticipant) => {
    // Here you can implement the logic to select a new participant from the employee list.
    // For the purpose of this example, I'll just select the first employee who is not a current participant.
    const newParticipant = employees.find(
      (e) =>
        !surveyPack.employeesTakingSurvey.some(
          (p: IParticipant) => p.employee === e._id
        )
    );

    if (newParticipant) {
      setReplacementParticipant(newParticipant._id);
      // Here you can dispatch an action to update your store with the new participant.
      // dispatch(replaceParticipant({ surveyPackId: surveyPack._id, oldParticipantId: declinedParticipant.employee, newParticipantId: newParticipant._id }));
    } else {
      // Handle the case when there are no more available employees to participate in the survey.
      console.error(
        "No more available employees to participate in the survey."
      );
    }
  };

  return (
    <div>
      {" "}
      <PageHeading pageTitle={t("Feedbacks")} />
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
            <ListGroup horizontal="xxl" className="my-2">
              <ListGroup.Item style={{ width: "30rem" }}>
                Deadline:{" "}
              </ListGroup.Item>
              <ListGroup.Item variant={daysLeft > 0 ? "info" : "danger"}>
                {new Date(surveyPack.deadline).toLocaleDateString()}
              </ListGroup.Item>{" "}
              <div>
                {daysLeft <= 0 &&
                  surveyPack.employeesTakingSurvey.filter(
                    (employee: IParticipantInput) =>
                      employee.acceptanceStatus === "Approved"
                  ).length <= 0 && (
                    <Button
                      variant="alert"
                      onClick={() =>
                        handleSendReminderEmail(
                          surveyPack._id,
                          surveyPack.employeesTakingSurvey
                            .filter(
                              (employee: IParticipantInput) =>
                                employee.acceptanceStatus === "Pending"
                            )
                            .map(
                              (employee: IParticipantInput) => employee.employee
                            )
                        )
                      }
                    >
                      Send Reminder
                    </Button>
                  )}
              </div>
            </ListGroup>{" "}
            <ListGroup horizontal="xxl" className="my-2">
              <ListGroup.Item style={{ width: "30rem" }}>
                Status:{" "}
              </ListGroup.Item>
              <ListGroup.Item variant="info">
                {surveyPack.status}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup horizontal="xxl" className="my-2">
              <ListGroup.Item style={{ width: "30rem" }}>
                Manager:{" "}
              </ListGroup.Item>
              <ListGroup.Item variant="info">
                {manager?.firstName + "" + manager?.surName}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup horizontal="xxl" className="my-2">
              <ListGroup.Item style={{ width: "30rem" }}>
                Manager Approved:{" "}
              </ListGroup.Item>
              <ListGroup.Item variant="info">
                {surveyPack.managerapproved ? "Yes" : "No"}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup horizontal="xxl" className="my-2">
              <ListGroup.Item style={{ width: "30rem" }}>
                HR Approved:{" "}
              </ListGroup.Item>
              <ListGroup.Item variant="info">
                {surveyPack.hrapproved ? "Yes" : "No"}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup horizontal="xxl" className="my-2">
              <ListGroup.Item style={{ width: "30rem" }}>
                Participants of this survey:
              </ListGroup.Item>
              <ListGroup.Item style={{ maxWidth: "30rem" }}>
                {participantNames ? (
                  participantNames
                    .split(", ")
                    .map((name: string, index: number, array: string[]) => {
                      const participant =
                        surveyPack.employeesTakingSurvey[index];
                      const isDeclined =
                        participant.acceptanceStatus === "Declined";
                      return (
                        <div
                          key={index}
                          className={
                            isDeclined ? classes.declined : classes.accepted
                          }
                        >
                          <span>
                            {name}
                            {index !== array.length - 1 && ", "}
                          </span>
                          {isDeclined && (
                            <Button
                              variant="small"
                              className="button-small"
                              onClick={() =>
                                handleReplaceParticipant(participant)
                              }
                            >
                              Replace
                            </Button>
                          )}
                        </div>
                      );
                    })
                ) : (
                  <span>No participants assigned yet</span>
                )}
              </ListGroup.Item>
            </ListGroup>
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
                    <Accordion>
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
                                    {qIndex + 1}. {question.question}
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            </Accordion.Body>
                          </Accordion.Item>
                        )
                      )}
                    </Accordion>
                  </Card.Body>
                </div>
              )}
            </Card>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackSingle;
