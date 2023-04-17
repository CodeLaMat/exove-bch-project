import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Table from "react-bootstrap/Table";
import { IEmployee } from "../../../types/userTypes";
import { RootState } from "../../../app/store";
import { initialiseEmployees } from "../../../features/user/userListSlice";

const DBUsers = () => {
  const dispatch = useAppDispatch();

  const employees: IEmployee[][] = useAppSelector(
    (state: RootState) => state.employees.employees
  );

  const entries = Object.values(employees);

  console.log(entries);
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
        {entries[0] &&
          entries[0].map((employee: IEmployee, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {employee.firstName} {employee.surName}
              </td>
              <td>{employee.title}</td>
              <td>{employee.department}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default DBUsers;
