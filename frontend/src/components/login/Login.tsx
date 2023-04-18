import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch} from "../../hooks/hooks";
import classes from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  setIsAuthenticated,
  setSelectedRole,
  setUserEmail,
} from "../../features/login/loginSlice";
import { loginAsync, ldspLoginAsync } from "../../features/login/loginSlice";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(ldspLoginAsync({ username: userName, password: password }));
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const decodedToken: { [key: string]: any } = jwt_decode(token!);
          console.log("decodedToken", decodedToken);
          const userRole = decodedToken.user.role;
          const userEmail = decodedToken.user.email;
          if (!userRole) {
            console.error("The token is invalid: could not extract user role.");
            alert("Error logging in: could not extract user role.");
            return;
          }
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          sessionStorage.setItem("userRole", userRole);
          sessionStorage.setItem("isAuthenticated", true.toString());
          sessionStorage.setItem("userEmail", userEmail);

          dispatch(setIsAuthenticated(true));
          dispatch(setUserEmail(userEmail));
          dispatch(setSelectedRole(userRole));
          navigate("/");
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

  console.log(sessionStorage.getItem("token"));

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
              <Form.Label htmlFor="username">username</Form.Label>
              <Form.Control
                id="username"
                placeholder="username"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
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
