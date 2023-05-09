import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../shared/button/Button";
import classes from "./Logout.module.css";
import { setIsAuthenticated } from "../../features/login/loginSlice";
import { useAppDispatch } from "../../hooks/hooks";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const LogoutPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios.defaults.headers.common["Authorization"] = "";
    Cookies.remove("token");
    dispatch(setIsAuthenticated(false));
  };

  const handleCancel = () => {
    navigate("/myprofile");
  };

  return (
    <div className={classes.logout_page_container}>
      <h1> {t('Logout')}</h1>
      <p> {t('Are you sure you want to logout')}?</p>
      <div className={classes.logout_buttons}>
        <Button variant="primary" type="button" onClick={handleLogout}>
        {t('Logout')}
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
        {t('Cancel')}
        </Button>
      </div>
    </div>
  );
};

export default LogoutPage;
