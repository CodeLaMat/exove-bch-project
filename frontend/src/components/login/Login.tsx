import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserRole } from "../../enum";
import { initialiseEmployees } from "../../redux/reducers/user/userListSlice";
import { initialiseQuestions } from "../../redux/reducers/survey/surveySlice";
import { useAppDispatch, useAppSelector } from "../../../src/redux/hooks/hooks";
import classes from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  setIsAuthenticated,
  setSelectedRole,
  setUserEmail,
} from "../../redux/reducers/login/loginSlice";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5010/api/v1/users/auth/login",
        {
          email,
          password,
        }
      );
      const userData = response.data;
      // console.log("Response:", response.data);

      if (userData && userData.token) {
        const token = userData.token;

        // Decoding token to get user role
        try {
          const decodedToken: { [key: string]: any } = jwt_decode(token);
          const userRole = decodedToken.role;
          const Email = decodedToken.email;
          if (!userRole) {
            console.error("The token is invalid: could not extract user role.");
            alert("Error logging in: could not extract user role.");
            return;
          }

          console.log(userRole);
          console.log(Email);

          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          localStorage.setItem("userRole", userRole);
          dispatch(setIsAuthenticated(true));
          dispatch(setUserEmail(Email));

          dispatch(setSelectedRole(userRole));
          dispatch(initialiseEmployees());
          dispatch(initialiseQuestions());
          navigate("/home");
        } catch (error) {
          console.error(error);
          alert("Error decoding token");
        }
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
        <div className={classes.login_text}>
          Welcome back! Please enter your email and password to log in and
          access your account. If you have forgotten your password, you can
          reset it by clicking the "Forgot Password" link below the login form.
        </div>
        <Form action="POST" onSubmit={loginHandler}>
          <fieldset>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                placeholder="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="passwordInput"
                type="password"
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
