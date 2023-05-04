import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { IEmployee, ISurveypack } from "../../../types/dataTypes";
import { initialiseSurveyPacks } from "../../../features/survey/surveyPacksSlice";
import { useAppSelector } from "../../../hooks/hooks";

const FeedbackSingle: React.FC = () => {
  const { id } = useParams();
  const [personBeingSurveyed, setPersonBeingSurveyed] = useState<string>("");
  const [manager, setManager] = useState<string>("");
  const [surveyPack, setSurveyPack] = useState<ISurveypack | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );

  const surveyPacks: ISurveypack[][] = useSelector(
    (state: RootState) => state.surveyPacks.surveyPacks
  );
  const surveyPacksArray = Object.values(surveyPacks);

  useEffect(() => {
    dispatch(initialiseSurveyPacks());
  }, [dispatch]);

  useEffect(() => {
    const selectedSurveyPack = surveyPacksArray
      .flat()
      .find((pack) => pack._id === id);
    if (selectedSurveyPack) {
      setSurveyPack(selectedSurveyPack);
      setPersonBeingSurveyed(
        getSurveyedPerson(selectedSurveyPack.personBeingSurveyed)
      );
      setManager(getManager(selectedSurveyPack.manager));
    }
  }, [id, surveyPacks]);

  const getSurveyedPerson = (personId: string) => {
    const employee = employees.find((employee) => employee._id === personId);
    if (employee) {
      return `${employee.firstName} ${employee.surName}`;
    }
    return "";
  };

  const getManager = (personId: string) => {
    const employee = employees.find((employee) => employee._id === personId);
    if (employee) {
      return `${employee.firstName} ${employee.surName}`;
    }
    return "";
  };

  return (
    <div>
      <h1>Feedback Pack</h1>
      {surveyPack ? (
        <div>
          <p>FeedbackPack ID: {surveyPack._id}</p>
          <p>Created At: {surveyPack.createdAt.toLocaleString()}</p>
          <p>Person Being Surveyed: {personBeingSurveyed}</p>
          <p>Manager: {manager}</p>
          <p>Deadline: {surveyPack.deadline.toLocaleString()}</p>
          <p>Status: {surveyPack.status}</p>
          <p>Manager Approved: {surveyPack.managerapproved ? "Yes" : "No"}</p>
          <p>HR Approved: {surveyPack.hrapproved ? "Yes" : "No"}</p>
          {/* Display other survey pack details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FeedbackSingle;
