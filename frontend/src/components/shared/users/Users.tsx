import React, { useEffect } from "react";
import PageHeading from "../../pageHeading/PageHeading";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Table from "react-bootstrap/Table";
import { IEmployee } from "../../../types/userTypes";
import { RootState } from "../../../app/store";
import { UserRole } from "../../../enum";
import classes from "./Users.module.css";
import { initialiseEmployees } from "../../../features/user/employeesSlice";

import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { createNewSurveyPack } from "../../../features/survey/surveyPacksSlice";
import {
  ICreateSurveyPack,
  IParticipant,
  ISurvey,
  SurveyPackStatus,
  User,
} from "../../../types/dataTypes";
import { useTranslation } from "react-i18next";

const Users = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();


  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const userData = useAppSelector((state) => state.loginUser.userData);
  const role = userData[0].role.join("");
  const employeesArray = Object.values(employees);

  //Sorting employees by name
  const sortedEmployees = [...employeesArray].sort((a, b) =>
    (a.firstName || "").localeCompare(b.firstName || "")
  );

  const currentDate = new Date();
  const deadline = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  const handleFormSendClick = (userid: string) => {
    navigate(`/sendForm/${userid}`);
  };

  useEffect(() => {
    dispatch(initialiseEmployees());
  }, [dispatch]);

  if (role === UserRole.HR) {
    return (
      <div className={classes.users_container}>
        <PageHeading pageTitle={t('Employee list')}/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>{t('Full Name')}</th>
              <th>{t('Title')}</th>
              <th>{t('Department')}</th>
              <th>{t('Last evaluation date')}</th>
              <th>{t('Start evaluation')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees &&
              sortedEmployees.map((employee: IEmployee, index: number) => (
                <tr key={employee._id}>
                  <td>{index + 1}</td>
                  <td>
                    {employee.firstName} {employee.surName}
                  </td>
                  <td>{employee.title}</td>
                  <td>{employee.department}</td>{" "}
                  <td>{new Date(Date.now()).toLocaleDateString("en-GB")}</td>
                  <td>
                    <Button
                      variant="standard"
                      type="button"
                      onClick={() => handleFormSendClick(employee._id)}
                    >
                      {t('Start')}
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
  return null;
};

export default Users;
