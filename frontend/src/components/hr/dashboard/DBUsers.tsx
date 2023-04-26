import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Table from "react-bootstrap/Table";
import { IEmployee } from "../../../types/userTypes";
import { RootState } from "../../../app/store";
import { initialiseEmployees } from "../../../features/user/userListSlice";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  surName: string;
  title: string;
  email: string;
  department: string;
  // add more properties as needed
}


const DBUsers = () => {
  const dispatch = useAppDispatch();

  const [employeeList, setEmployeeList] = useState<User[]>([]);

  const employees: IEmployee[][] = useAppSelector(
    (state: RootState) => state.employees.employees
  );

  const entries = Object.values(employees);

  useEffect(() => {
    // dispatch(initialiseEmployees());
    
    axios.get('http://localhost:5010/api/v1/users/user')
    .then((response) => {
      
      setEmployeeList(response.data.users);
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
        {employeeList &&
          employeeList.map((user, index) => (
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
