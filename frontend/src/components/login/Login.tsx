import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../../hooks/hooks";
import classes from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  setIsAuthenticated,
  setUserData,
} from "../../features/login/loginSlice";
import Cookies from "js-cookie";

import { ldspLoginAsync } from "../../features/login/loginSlice";
import { IUser } from "../../types/loginTypes";
import LanguageSwitcher from '../shared/Translation';
import { useTranslation } from "react-i18next";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(
        ldspLoginAsync({ username: userName, password: password })
      );
      const token = Cookies.get("token");
      if (token) {
        try {
          const decodedToken: { [key: string]: any } = jwt_decode(token!);
          const userRole = decodedToken.user.role;
          const userData = Object.values(decodedToken) as IUser[];
          dispatch(setUserData(userData));
          const expirationDate = Number(userData[2]);
          const currentTime = Math.floor(Date.now() / 1000);
          const remainingTimeInSeconds = expirationDate - currentTime;

          if (remainingTimeInSeconds > 0) {
            Cookies.set("token", token, {
              expires: remainingTimeInSeconds / (60 * 60 * 24),
            });
          } else {
            console.error("Token is already expired.");
            return;
          }
          if (!userRole) {
            console.error("The token is invalid: could not extract user role.");
            alert("Error logging in: could not extract user role.");
            return;
          }
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          dispatch(setIsAuthenticated(true));
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

  return (
    <div className={classes.login_container}>
      <LanguageSwitcher />
      <div className={classes.login_box}>
        <h3>{t('login')}</h3>
        <div className={classes.login_text}>
        {t('loginGreeting')}
        </div>
        <Form action="POST" onSubmit={loginHandler}>
          <fieldset>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">{t('username')}</Form.Label>
              <Form.Control
                id="username"
                placeholder="username"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">{t('password')}</Form.Label>
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
                label={t('keepMeLogged')}
              />
            </Form.Group>
            <Button type="submit">{t('login')}</Button>
          </fieldset>
        </Form>
      </div>
    </div>
  );
};

export default Login;
