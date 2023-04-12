import React, { useEffect } from "react";
import PageHeading from "../../pageHeading/PageHeading";
import { initialiseEmployees } from "../../../redux/reducers/user/userListSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import Table from "react-bootstrap/Table";
import { Employee } from "../../../redux/types/userTypes";
import { RootState } from "../../../redux/store";
import classes from "./HRUsers.module.css";

const Users = () => {
  const dispatch = useAppDispatch();
  const employees: Employee[][] = useAppSelector(
    (state: RootState) => state.employees.employees
  );

  const entries = Object.values(employees);

  console.log(entries);
  useEffect(() => {
    dispatch(initialiseEmployees());
  }, [dispatch]);

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
            entries[0].map((employee: Employee, index: number) => (
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
};

export default Users;
