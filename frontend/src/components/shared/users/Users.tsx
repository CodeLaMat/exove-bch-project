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
  const role = userData[0].role.join("");
  const employeesArray = Object.values(employees);

  //Sorting employees by name
  const sortedEmployees = [...employeesArray[0]].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

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
              <th>Send to evaluation</th>
              <th>Edit</th>
              <th>Delete</th>
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
                      Send
                    </Button>
                  </td>
                  <td>
                    <Button variant="primary" type="button">
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button variant="alert" type="button">
                      Delete
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
