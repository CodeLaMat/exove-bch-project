import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import classes from "./Feedbacks.module.css";
import { IEmployee, ISurveypack } from "../../../types/dataTypes";
import { initialiseSurveyPacks } from "../../../features/survey/surveyPacksSlice";
import { RootState, AppDispatch } from "../../../app/store";
import Button from "../../shared/button/Button";
import PageHeading from "../../pageHeading/PageHeading";
import { useAppSelector } from "../../../hooks/hooks";
import { useTranslation } from "react-i18next";

const Feedbacks: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const employeesArray = Object.values(employees);
  const surveyPacks: ISurveypack[][] = useSelector(
    (state: RootState) => state.surveyPacks.surveyPacks
  );

  const surveyPacksArray = Object.values(surveyPacks);
  const approvedSurveyPacks = surveyPacksArray[0]?.filter(
    (surveyPack) => surveyPack.hrapproved
  );

  const getSurveyedPerson = (personId: string) => {
    const employee = employeesArray.find(
      (employee) => employee._id === personId
    );
    if (employee) {
      return `${employee.firstName} ${employee.surName}`;
    }
    return "";
  };

  const getManager = (personId: string) => {
    const employee = employeesArray.find(
      (employee) => employee._id === personId
    );
    if (employee) {
      return `${employee.firstName} ${employee.surName}`;
    }
    return "";
  };

  console.log(employeesArray);

  useEffect(() => {
    dispatch(initialiseSurveyPacks());
  }, [dispatch]);

  const handleSurveyPackClick = (packid: string) => {
    // const surveyPack = surveyPacksArray[0]?.find((pack) => pack._id === id);

    // if (surveyPack && surveyPack.employeesTakingSurvey.length > 0) {
    navigate(`/feedbacks/${packid}`);
    // } else {
    //   navigate(`/participants/${id}`);
    // }
  };

  return (
    <div>
      <PageHeading pageTitle={t("Feedbacks")} />
      <div className={classes.users_container}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>N</th>
              <th>{t("Surveyed person")}</th>
              <th>{t("Approved Participants")}</th>
              <th>{t("Manager")}</th>
              <th>{t("Manager Approved")}</th>
              <th>{t("Status")}</th>
              <th>{t("Creation date")}</th>
              <th>{t("Deadline")}</th>
              <th>{t("Open")}</th>
            </tr>
          </thead>
          <tbody>
            {approvedSurveyPacks?.map((surveyPack, index) => (
              <tr key={surveyPack._id}>
                <td>{index + 1}</td>
                <td>{getSurveyedPerson(surveyPack.personBeingSurveyed)}</td>
                <td
                  className={`${
                    surveyPack.employeesTakingSurvey.filter(
                      (employee) => employee.acceptanceStatus === "Approved"
                    ).length === 6
                      ? classes.acceptance_approved
                      : ""
                  }`}
                >
                  <span
                    className={`${
                      surveyPack.employeesTakingSurvey.filter(
                        (employee) => employee.acceptanceStatus === "Declined"
                      ).length > 0
                        ? classes.acceptance_declined
                        : surveyPack.employeesTakingSurvey.filter(
                            (employee) =>
                              employee.acceptanceStatus === "Approved"
                          ).length > 0
                        ? classes.acceptance_approved
                        : classes.acceptanceStatus_default
                    }`}
                  >
                    {
                      surveyPack.employeesTakingSurvey.filter(
                        (employee) => employee.acceptanceStatus !== "Pending"
                      ).length
                    }
                  </span>
                  /{surveyPack.employeesTakingSurvey.length}
                </td>
                <td>{getManager(surveyPack.manager)}</td>
                <td>{surveyPack.managerapproved.toString()}</td>
                <td>{surveyPack.status}</td>
                <td>
                  {new Date(surveyPack.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td>
                  {new Date(surveyPack.deadline).toLocaleDateString("en-GB")}
                </td>
                <td>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => handleSurveyPackClick(surveyPack._id)}
                  >
                    {t("Open")}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
  return null;
};

export default Feedbacks;
