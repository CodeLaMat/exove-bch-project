import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { RootState } from "../../../../app/store";
import {
  IEmployee,
  IParticipant,
  IParticipantInput,
  IQuestion,
  IResponsePack,
  ISurvey,
  ISurveypack,
} from "../../../../types/dataTypes";
import classes from "./EvaluationPackDetails.module.css";
import Button from "../../../shared/button/Button";
import { Card, ListGroup, Form, Accordion, Toast } from "react-bootstrap";
import { useAppSelector } from "../../../../hooks/hooks";
import { Categories } from "../../../../types/dataTypes";
import { useDispatch } from "react-redux";
import { updateSurveyPack } from "../../../../features/survey/surveyPacksSlice";
import { AppDispatch } from "../../../../app/store";
import {
  addResponseToPack,
  initialiseResponsePacks,
} from "../../../../features/survey/responsesSlice";

const EvaluationPackDetails: React.FC = () => {
  const [responses, setResponses] = useState<
    Array<{ questionId: string; answer: any }>
  >([]);
  const [showToast, setShowToast] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
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

  const responsePacks: IResponsePack[] = useAppSelector(
    (state: RootState) => state.responses.responsePacks
  );

  const surveysArray = Object.values(surveys);
  const surveyPacksArray = Object.values(surveyPacks);
  const responsePacksArray = Object.values(responsePacks);
  const cleanedSurveyPacks = Object.values(surveyPacksArray[0]);
  const surveyPack = cleanedSurveyPacks.find((pack) => pack._id === userpackid);

  const userData = useAppSelector((state) => state.loginUser.userData?.[0]);
  const userEmail = userData.email.join("");
  const userId = employees.find((e) => e.email === userEmail)?._id ?? "";

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
    dispatch(initialiseResponsePacks());
  }, [dispatch]);

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

  const participant: IParticipantInput | undefined =
    foundSurveyPack?.employeesTakingSurvey?.find(
      (participant) => participant.employee === userId
    );

  const handleAcceptanceStatusChange = async (
    acceptanceStatus: "Pending" | "Approved" | "Declined",
    surveyPack: ISurveypack,
    participantId: string
  ) => {
    const updatedParticipants = surveyPack.employeesTakingSurvey.map((p) =>
      p.employee === participantId ? { ...p, acceptanceStatus } : p
    );

    dispatch(
      updateSurveyPack({
        surveyPackId: surveyPack._id,
        changes: { employeesTakingSurvey: updatedParticipants },
      })
    );
  };

  const handleResponseSelection = (questionId: string, answer: any) => {
    const updatedResponses = responses.filter(
      (response) => response.questionId !== questionId
    );
    updatedResponses.push({ questionId, answer });
    setResponses(updatedResponses);
  };

  const getResponsePackId = (surveyPackId: string) => {
    const responsePackArray = responsePacksArray[0];
    if (Array.isArray(responsePackArray)) {
      const responsePack = responsePackArray.find(
        (rp) => rp.surveyPack === surveyPackId
      );
      return responsePack ? responsePack._id : null;
    }
    return null;
  };

  console.log("REsponsePacks", responsePacksArray);
  console.log("SurveyPackId", userpackid);
  console.error("REsponses", responses);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    const transformedResponses = responses.map((response) => ({
      question: response.questionId,
      response: response.answer,
    }));
    if (!userpackid) {
      console.error("No userpackid found.");
      return;
    }
    const responsePackId = getResponsePackId(userpackid);
    if (responsePackId) {
      dispatch(
        addResponseToPack({
          responsePackId,
          allResponses: { allResponses: transformedResponses },
        })
      );
      setTimeout(() => {
        setShowToast(false);
        navigate("/userevaluations");
      }, 3000);
      setResponses([]);
    } else {
      alert("Cannot submit responses, responsePackId not found");
    }
  };

  if (!surveyPack) {
    return <div>Survey pack not found</div>;
  }

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
                {participant &&
                  participant.acceptanceStatus === "Approved" &&
                  !participant.isSurveyComplete && (
                    <Card.Body>
                      <h4>Questions:</h4>
                      <Accordion defaultActiveKey="0">
                        {Object.entries(questionsByCategory).map(
                          ([category, questions], index) => (
                            <Accordion.Item
                              key={category}
                              eventKey={`${index}`}
                            >
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
                              {surveyPack.hrapproved ? (
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
                                            {[1, 2, 3, 4, 5].map((val) => (
                                              <Form.Check
                                                key={val}
                                                inline
                                                label={val}
                                                name={`radioGroup-${qIndex}`}
                                                type="radio"
                                                id={`radio-${val}`}
                                                value={val}
                                                onChange={(e) =>
                                                  handleResponseSelection(
                                                    question._id,
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            ))}
                                          </Form>
                                        ) : (
                                          <Form>
                                            <Form.Group controlId="formBasicText">
                                              <Form.Control
                                                type="text"
                                                placeholder="Enter your answer"
                                                className="my-4"
                                                onChange={(e) =>
                                                  handleResponseSelection(
                                                    question._id,
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            </Form.Group>
                                          </Form>
                                        )}
                                      </ListGroup.Item>
                                    ))}
                                  </ListGroup>
                                </Accordion.Body>
                              ) : (
                                <p>
                                  The participants of this survey have not been
                                  approved by HR yet.
                                </p>
                              )}
                            </Accordion.Item>
                          )
                        )}
                      </Accordion>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!surveyPack.hrapproved}
                      >
                        Submit
                      </Button>
                    </Card.Body>
                  )}
                {participant && participant.acceptanceStatus === "Pending" && (
                  <Card.Body>
                    <div>
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleAcceptanceStatusChange(
                            "Approved",
                            surveyPack,
                            participant.employee
                          )
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        variant="alert"
                        onClick={() =>
                          handleAcceptanceStatusChange(
                            "Declined",
                            surveyPack,
                            participant.employee
                          )
                        }
                      >
                        Decline
                      </Button>
                    </div>
                  </Card.Body>
                )}
                {participant && participant.acceptanceStatus === "Declined" && (
                  <Card.Body>
                    <div>You have declined this survey.</div>
                  </Card.Body>
                )}
                {!participant && (
                  <Card.Body>
                    <div>You are not a participant in this survey.</div>
                  </Card.Body>
                )}
              </div>
            )}
          </Card>
        </Card.Body>
      </Card>
      <Toast className={classes.toast} show={showToast} autohide bg="info">
        <Toast.Header>
          <strong className="mr-auto">Participants Submitted</strong>
        </Toast.Header>
        <Toast.Body>Your answers have been successfully submitted.</Toast.Body>
      </Toast>
    </div>
  );
};

export default EvaluationPackDetails;
