import React from "react";
import { useAppSelector } from "../../../hooks/hooks";
import Table from "react-bootstrap/Table";
import { IEmployee } from "../../../types/userTypes";


const DBUsers = () => {
  const employeesList = useAppSelector((state) => state.employees.employees);

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
        {employeesList &&
          employeesList.users.map((user: IEmployee, index: number) => (
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