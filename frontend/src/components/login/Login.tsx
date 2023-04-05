import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    navigate("/home"); // redirect to the dashboard page
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
        <Form>
          <fieldset disabled>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledTextInput">
                Disabled input
              </Form.Label>
              <Form.Control
                id="disabledTextInput"
                placeholder="Disabled input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledSelect">
                Disabled select menu
              </Form.Label>
              <Form.Select id="disabledSelect">
                <option>Disabled select</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                id="disabledFieldsetCheck"
                label="Can't check this"
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
