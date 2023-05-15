import React, { useEffect, useState } from "react";
import { UserRole } from "../../../enum";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import PageHeading from "../../pageHeading/PageHeading";
import classes from "./SelectSurvey.module.css";
import { InputGroup, Table } from "react-bootstrap";
import { ISurvey } from "../../../types/dataTypes";
import { RootState } from "../../../app/store";
import { initialiseSurveys } from "../../../features/survey/surveysSlice";
import { setSurvey } from "../../../features/survey/surveyPackSlice";
import { useTranslation } from "react-i18next";

const SelectSurvey = () => {
  const dispatch = useAppDispatch();
  const [selectedSurvey, setSelectedSurvey] = useState<ISurvey | null>(null);
  const userData = useAppSelector((state) => state.loginUser.userData);
  const role = userData[0].role.join("");
  const { t } = useTranslation();

  const surveys: ISurvey[] = useAppSelector(
    (state: RootState) => state.surveys.surveys
  );

  useEffect(() => {
    dispatch(initialiseSurveys());
  }, [dispatch]);

  const handleSelect = (survey: ISurvey) => {
    setSelectedSurvey(survey);
    dispatch(setSurvey(survey._id));
  };

  useEffect(() => {
    if (selectedSurvey) {
      dispatch(setSurvey(selectedSurvey._id));
    }
  }, [dispatch, selectedSurvey]);

  if (role === UserRole.HR) {
    return (
      <div className={classes.surveys_container}>
        <div className={classes.top}>
          {" "}
          <div className={classes.maincontent}>
            <div className={classes.table_container}>
              <Table striped bordered hover size="md">
                <thead>
                  <tr>
                    <th>{t("Survey Name")}</th>
                    <th>{t("Description")}</th>
                    <th>{t("Number of questions")}</th>
                    <th>{t("Select")}</th>
                  </tr>
                </thead>
                <tbody>
                  {surveys.map((survey: ISurvey) => (
                    <tr key={survey._id}>
                      <td>{survey.surveyName}</td>
                      <td>{survey.description}</td>
                      <td>
                        <ul>{survey.questions.length}</ul>
                      </td>
                      <td>
                        <InputGroup>
                          <InputGroup.Radio
                            aria-label="Radio button for following text input"
                            type="radio"
                            name="survey"
                            value={survey}
                            checked={selectedSurvey?._id === survey._id}
                            onChange={() => handleSelect(survey)}
                          />
                        </InputGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default SelectSurvey;
