import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Table from "react-bootstrap/Table";
import { IEmployee } from "../../../types/userTypes";
import { RootState } from "../../../app/store";
import { initialiseEmployees } from "../../../features/user/userListSlice";
import axios from "axios";

const DBUsers = () => {
  const dispatch = useAppDispatch();

  const employeeList = useState([]);

  const employees: IEmployee[][] = useAppSelector(
    (state: RootState) => state.employees.employees
  );

  const entries = Object.values(employees);

  const userData = useAppSelector((state) => state.loginUser.userData);
  const user = userData[0];
  const FullName = user.name.join(" ");
  const nameArray = FullName.split(" ");
  const firstName = nameArray[0];
  const role = user.role.join("");

  console.log(entries);
  useEffect(() => {
    // dispatch(initialiseEmployees());
    
    axios.get('http://localhost:5010/api/v1/users/user')
    .then((response) => {
      console.log("usersList", response.data);
      employeeList.push(response.data);
    })
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
        {employeeList[0] &&
          employeeList[0].map((employee: IEmployee, index: number) => (
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
