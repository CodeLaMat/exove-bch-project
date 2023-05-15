import React, { useEffect } from "react";
import classes from "./DBSurveyList.module.css";
import { Dropdown, Table } from "react-bootstrap";
import { ISurvey } from "../../../types/dataTypes";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../app/store";
import { initialiseSurveys } from "../../../features/survey/surveysSlice";
import { useTranslation } from "react-i18next";

const DBSurveyList = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const surveys: ISurvey[] = useAppSelector(
    (state: RootState) => state.surveys.surveys
  );
  useEffect(() => {
    dispatch(initialiseSurveys());
  }, [dispatch]);

  return (
    <div className={classes.surveys_container}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>{t("Survey Name")}</th>
            <th>{t("Description")}</th>
            <th>{t("Questions")}</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey: ISurvey, index) => (
            <tr key={survey._id}>
              <td>{index + 1}</td>
              <td>{survey.surveyName}</td>
              <td className="text-truncate" style={{ maxWidth: "300px" }}>
                {survey.description}
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-basic"
                    size="sm"
                  >
                    {t("View Questions")}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {survey.questions.map((question) => (
                      <Dropdown.Item key={question._id}>
                        {question.question}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DBSurveyList;
