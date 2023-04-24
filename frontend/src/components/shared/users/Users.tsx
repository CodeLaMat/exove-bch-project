import React, { useEffect } from "react";
import { UserRole } from "../../../enum";
import PageHeading from "../../pageHeading/PageHeading";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Table from "react-bootstrap/Table";
import { IEmployee } from "../../../types/userTypes";
import { RootState } from "../../../app/store";
import classes from "./Users.module.css";
import { initialiseEmployees } from "../../../features/user/userListSlice";

const Users = () => {
  const dispatch = useAppDispatch();
  
  const employees: IEmployee[][] = useAppSelector(
    (state: RootState) => state.employees.employees
  );

  const userData = useAppSelector((state) => state.loginUser.userData);
  const role = userData[0].role.join("");

  const entries = Object.values(employees);

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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {entries[0] &&
              entries[0].map((employee: IEmployee, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {employee.firstName} {employee.surName}
                  </td>
                  <td>{employee.title}</td>
                  <td>{employee.department}</td>
                  <td>
                    <button>Edit</button>
                  </td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  } else return null;
};

export default Users;
