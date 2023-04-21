import React, { useEffect, useState } from "react";
import { UserRole } from "../../../enum";
import PageHeading from "../../pageHeading/PageHeading";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import Table from "react-bootstrap/Table";
import { IEmployee } from "../../../types/userTypes";
import { RootState } from "../../../app/store";
import classes from "./Users.module.css";
import { initialiseEmployees } from "../../../features/user/userListSlice";
// import { User } from "../../../features/login/loginSlice";
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

const Users = () => {
  const dispatch = useAppDispatch();
  const { selectedRole } = useAppSelector((state) => state.loginUser);
  const employees: IEmployee[][] = useAppSelector(
    (state: RootState) => state.employees.employees
  );

  const [employeeList, setEmployeeList] = useState<User[]>([]);
  const entries = Object.values(employeeList);

  const userData = useAppSelector((state) => state.loginUser.userData);
  const user = userData[0];
  const role = user.role.join("");

  console.log(employeeList);
  useEffect(() => {
    // dispatch(initialiseEmployees());
    axios.get('http://localhost:5010/api/v1/users/user')
    .then((response) => {
      setEmployeeList(response.data.users);
    })
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
        {employeeList &&
          employeeList.map((users, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {users.firstName} {users.surName}
              </td>
              <td>{users.title}</td>
              <td>{users.department}</td>
            </tr>
          ))}
      </tbody>
        </Table>
      </div>
    );
  } else return null;
};

export default Users;
