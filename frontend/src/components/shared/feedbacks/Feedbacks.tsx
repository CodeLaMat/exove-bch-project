import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { UserRole } from "../../../enum";
import classes from "./Feedbacks.module.css";
import { IEmployee, ISurveypack } from "../../../types/dataTypes";
import { initialiseSurveyPacks } from "../../../features/survey/surveyPacksSlice";
import { RootState, AppDispatch } from "../../../app/store";
import Button from "../../shared/button/Button";
import PageHeading from "../../pageHeading/PageHeading";
import { useAppSelector } from "../../../hooks/hooks";

const Feedbacks: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const employees: IEmployee[][] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const employeesArray = Object.values(employees);
  const surveyPacks: ISurveypack[][] = useSelector(
    (state: RootState) => state.surveyPacks.surveyPacks
  );
  const surveyPacksArray = Object.values(surveyPacks);

  const getSurveyedPerson = (personId: string) => {
    const employee = employeesArray[0].find(
      (employee) => employee._id === personId
    );
    if (employee) {
      return `${employee.firstName} ${employee.surName}`;
    }
    return "";
  };

  const getManager = (personId: string) => {
    const employee = employeesArray[0].find(
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

  console.log("surveyPacks", surveyPacks);

  const handleSurveyPackClick = (id: string) => {
    navigate(`/surveyPack/${id}`);
  };

  return (
    <div className={classes.users_container}>
      <PageHeading pageTitle="Feedbacks" />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>N</th>
            <th>Surveyed person</th>
            <th>Approved Participants</th>
            <th>Manager</th>
            <th>Manager Approved</th>
            <th>Status</th>
            <th>Creation date</th>
            <th>Deadline</th>
            <th>Open</th>
          </tr>
        </thead>
        <tbody>
          {surveyPacksArray[0]?.map((surveyPack, index) => (
            <tr key={surveyPack._id}>
              <td>{index + 1}</td>
              <td>{getSurveyedPerson(surveyPack.personBeingSurveyed)}</td>
              <td>
                {
                  surveyPack.employeesTakingSurvey.filter(
                    (employee) => employee.acceptanceStatus === "Approved"
                  ).length
                }
                /{surveyPack.employeesTakingSurvey.length}
              </td>
              <td>{getSurveyedPerson(surveyPack.manager)}</td>
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
                  Open
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  return null;
};

export default Feedbacks;
