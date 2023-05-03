import React, { useEffect } from "react";
import PageHeading from "../../pageHeading/PageHeading";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Table from "react-bootstrap/Table";
import { IEmployee } from "../../../types/userTypes";
import { RootState } from "../../../app/store";
import { UserRole } from "../../../enum";
import classes from "./Users.module.css";
import { initialiseEmployees } from "../../../features/user/userListSlice";

import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const Users = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const employees: IEmployee[][] = useAppSelector(
    (state: RootState) => state.employees.employees
  );

  const userData = useAppSelector((state) => state.loginUser.userData);
  const user = userData[0];
  const role = user.role.join("");
  const usersArray = Object.values(employees);

  const handleFormSendClick = (userid: string) => {
    navigate(`/sendForm/${userid}`);
  };

  useEffect(() => {
    dispatch(initialiseEmployees());
  }, [dispatch]);

  if (role === UserRole.HR) {
    return (
      <div className={classes.users_container}>
        <PageHeading pageTitle="Employee list" />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Title</th>
              <th>Department</th>
              <th>Last evaluation date</th>
              <th>Start evaluation</th>
            </tr>
          </thead>
          <tbody>
            {usersArray[0] &&
              usersArray[0].map((employee: IEmployee, index: number) => (
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
                      Start
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
