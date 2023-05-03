import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Table from "react-bootstrap/Table";
import { IEmployee } from "../../../types/userTypes";
import { RootState } from "../../../app/store";
import { initialiseEmployees } from "../../../features/user/employeesSlice";

const DBUsers = () => {
  const dispatch = useAppDispatch();
  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );

  const employeesArray = Object.values(employees);

  useEffect(() => {
    dispatch(initialiseEmployees());
  }, [dispatch]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Title</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        {employeesArray &&
          employeesArray.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {user.firstName} {user.surName}
              </td>
              <td>{user.title}</td>
              <td>{user.department}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default DBUsers;
