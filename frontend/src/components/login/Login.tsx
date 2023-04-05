import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserRole } from "../../enum";
import { SetIsAuthenticatedAction } from "../../redux/reducers/login/loginSlice";
import {
  getEmployees,
  initialiseEmployees,
} from "../../redux/reducers/user/userListSlice";
import { initialiseQuestions } from "../../redux/reducers/form/formSlice";
import { useAppDispatch, useAppSelector } from "../../../src/redux/hooks/hooks";
import classes from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const { selectedRole } = useAppSelector((state) => state.loginUser);
  const navigate = useNavigate();

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "SET_SELECTED_ROLE",
      payload: event.target.value as UserRole,
    });
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent default form submission behavior
    // do any necessary login authentication/validation
    dispatch<SetIsAuthenticatedAction>({
      type: "SET_IS_AUTHENTICATED",
      payload: true,
    });
    dispatch(initialiseEmployees());
    dispatch(initialiseQuestions());
    navigate("/home");
  };

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // We make API call to authenticate user
      const response = await axios.post("http://localhost:5010/auth/login", {
        email,
        password,
      });
      const userData = response.data;
      console.log("Response:", response.data);
      // We check if user with email and password exists
      if (userData) {
        dispatch<SetIsAuthenticatedAction>({
          type: "SET_IS_AUTHENTICATED",
          payload: true,
        });
        dispatch({
          type: "SET_SELECTED_ROLE",
          payload: userData.role as UserRole,
        });
        dispatch(initialiseEmployees());
        dispatch(initialiseQuestions());
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      alert("Error logging in");
    }
  };

  return (
    <div className={classes.login_container}>
      <div className={classes.login_box}>
        <h3>Login</h3>
        <div>
          <form onSubmit={handleLogin}>
            <div className={classes.login_input}>
              <label htmlFor="role-select">Select your role:</label>
              <select
                id="role-select"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                <option value={UserRole.User}>User</option>
                <option value={UserRole.Manager}>Manager</option>
                <option value={UserRole.HR}>HR</option>
              </select>
            </div>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </form>
        </div>
        <div className={classes.login_text}>
          Welcome back! Please enter your email and password to log in and
          access your account. If you have forgotten your password, you can
          reset it by clicking the "Forgot Password" link below the login form.
        </div>
        <Form action="POST" onSubmit={loginHandler}>
          <fieldset>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="TextInput">Email</Form.Label>
              <Form.Control id="TextInput" placeholder="email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="passwordInput"
                type="password"
                placeholder="password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="disabledFieldsetCheck"
                label="Keep you loged in"
              />
            </Form.Group>
            <Button type="submit">Login</Button>
          </fieldset>
        </Form>
      </div>
    </div>
  );
};

export default Login;
