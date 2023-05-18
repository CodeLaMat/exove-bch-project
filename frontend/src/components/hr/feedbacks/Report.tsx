import React, { useEffect, useState } from "react";
import GenericPdfDownloader from "../../shared/dashboard/pdfDownloader";
import classes from "./Report.module.css";
import { ProgressBar } from "react-bootstrap";
import { useParams } from "react-router";
import { Container, Row, Col } from "react-bootstrap";

import {
  IEmployee,
  IParticipant,
  IResponsePack,
  ISurvey,
  ISurveypack,
} from "../../../types/dataTypes";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../app/store";
import { RadarChart } from "recharts";
import UserRadarChart from "./RadarChart";
import { initialiseResponsePacks } from "../../../features/survey/responsesSlice";

const responses = [
  { question: "Question 1", response: "Response 1" },
  { question: "Question 2", response: "Response 2" },
  { question: "Question 3", response: "Response 3" },
];

const Report = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<IEmployee | null>(null);
  const [surveyPack, setSurveyPack] = useState<ISurveypack | null>(null);
  const [allResponses, setAllResponses] = useState<any[]>([]);
  const dispatch = useAppDispatch();
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

  const surveyPacksArray = Object.values(surveyPacks);
  const cleanedSurveyPacks = Object.values(surveyPacksArray[0]);

  const surveysArray = Object.values(surveys);
  const responsePacksArray = Object.values(responsePacks);

  useEffect(() => {
    dispatch(initialiseResponsePacks());
  }, [dispatch]);

  useEffect(() => {
    const foundEmployee = employees.find((e) => e._id === id);
    if (foundEmployee) {
      setEmployee(foundEmployee);
    }

    const surveyPack = cleanedSurveyPacks.find(
      (pack) => pack.personBeingSurveyed === id
    );
    if (surveyPack) {
      setSurveyPack(surveyPack);
    }

    const responsePack = responsePacksArray.find(
      (pack: IResponsePack) => pack.personBeingSurveyed === id
    );

    if (responsePack) {
      const allResponses = responsePack.totalResponses.flatMap(
        (response: any) => response.allResponses
      );

      setAllResponses(allResponses);
    }
  }, [id, employees, cleanedSurveyPacks]);

  console.log("All Responses", allResponses);

  const participantNames = surveyPack?.employeesTakingSurvey
    ?.map((participant: IParticipant) => {
      const foundEmployee = employees.find(
        (e) => e._id === participant.employee
      );
      return foundEmployee
        ? `${foundEmployee.firstName[0]}. ${foundEmployee.surName}`
        : null;
    })
    .filter((name) => name)
    .join(", ");

  const getManager = (personId: string | undefined) => {
    const employee = employees.find((employee) => employee._id === personId);
    if (employee) {
      return `${employee.firstName[0]}. ${employee.surName}`;
    }
    return "";
  };

  const managerEvaluations = [
    { title: "Quality focus", score: 50, text: "managerQualityFocusText" },
    { title: "People skills", score: 60, text: "managerPeopleSkillsText" },
    { title: "Self guidance", score: 70, text: "managerSelfGuidanceText" },
    // Add all your manager evaluation types here
  ];

  const participantEvaluations = [
    { title: "Quality focus", score: 80, text: "participantQualityFocusText" },
    { title: "People skills", score: 90, text: "participantPeopleSkillsText" },
    { title: "Self guidance", score: 100, text: "participantSelfGuidanceText" },
    // Add all your participant evaluation types here
  ];

  return (
    <div className={classes.report_container}>
      <Container fluid className={classes.report}>
        <GenericPdfDownloader
          downloadFileName="DashboardPDF"
          rootElementId="dashboardPdf"
        />
        <div id="dashboardPdf" className={classes.report_dataContainer}>
          <Row className={classes.header}>
            <Col xs={6}>
              <div className={classes.userInfo_container}>
                <div>
                  <h1>
                    {employee?.firstName} {employee?.surName}
                  </h1>
                </div>
                <div className={classes.userInfo}>
                  <div className={classes.titleValueRow}>
                    <div>Title:</div>
                    <span>{employee?.title}</span>
                  </div>
                  <div className={classes.titleValueRow}>
                    <div>Role:</div>
                    <span>{employee?.role}</span>
                  </div>
                  <div className={classes.titleValueRow}>
                    <div>Department:</div>
                    <span>{employee?.department}</span>
                  </div>
                  <div className={classes.titleValueRow}>
                    <div>Manager:</div>
                    <span>{getManager(employee?.work.reportsTo)}</span>
                  </div>
                  <div className={classes.titleValueRow}>
                    <div>Survey participants:</div>
                    <span>
                      {participantNames
                        ? participantNames
                        : "No participants assigned yet"}
                    </span>
                  </div>
                  <div className={classes.titleValueRow}>
                    <div>Survey date:</div>
                    <span>{"surveyDate"}</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={6}>
              <div className={classes.dashboard_progress}>
                <UserRadarChart />
              </div>
            </Col>
          </Row>
          <hr />
          <Row className={classes.evaluation_body}>
            {[managerEvaluations, participantEvaluations].map(
              (evaluations, index) => (
                <Col
                  xs={6}
                  className={`${classes.evaluation} ${classes.evaluationCustomSize}`}
                >
                  <h5>
                    {index === 0
                      ? "Manager's Evaluation"
                      : "Participant's Evaluation"}
                  </h5>
                  {evaluations.map((evaluation) => (
                    <>
                      <h6>{evaluation.title}</h6>
                      <ProgressBar
                        variant="success"
                        now={evaluation.score}
                        className={classes.progressBarCustomSize}
                      />
                      <p>{evaluation.text}</p>
                    </>
                  ))}
                </Col>
              )
            )}
          </Row>
          <Row className={classes.footer}>
            <Col xs={6}>
              <p>Print date: {"printDate"}</p>
            </Col>
            <Col xs={6}>
              <p className={classes.nameOnCorner}>
                {employee?.firstName} {employee?.surName}
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Report;
