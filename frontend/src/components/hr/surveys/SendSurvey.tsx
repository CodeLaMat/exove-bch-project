import React from 'react';
import classes from "./CreateSurvey.module.css";
import PageHeading from '../../pageHeading/PageHeading';
import { Accordion, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Form from "react-bootstrap/Form";
import { useAppSelector } from '../../../hooks/hooks';
import { IEmployee } from '../../../types/userTypes';

const SendSurvey = () => {
    const navigate = useNavigate();
    const employeesList = useAppSelector((state) => state.employees.employees);

    const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
       console.log(e.target.value);
      };

    return(
        <div className={classes.surveyCreate_container}>
            <PageHeading pageTitle="Send Survey" />{" "}
            <div className={classes.back_button}>
            <Button variant="primary" onClick={() => navigate("/surveys")}>
                Back
            </Button>
            </div>
            <div className={classes.top}>
            <div className={classes.surveyForm_container}>
                <form action="POST" >
                    <div className={classes.formSelect}>
                        <label>Employee to be surveyed</label>
                        <select
                            name="selection"
                            id="selection"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                changeHandler(e)
                            }
                        >
                            { employeesList.users.map((user: IEmployee) => (
                                <option value= {` ${user.surName} ${user.firstName}`} >{user.surName} {user.firstName} </option>
                            ))}
                        </select>
                    </div>
                    
                    
                    <label>
                        Description:
                        <input
                        type="text"
                        name="description"
                        
                        />
                    </label>
                    <Accordion
                        defaultActiveKey={["0"]}
                        alwaysOpen
                        className={classes.Accordion}>
                        
                    </Accordion>
                    <div className={classes.submit_button}>
                        <Button type="submit" variant="primary">
                        Submit
                        </Button>
                    </div>
                </form>
            </div>
            </div>
            </div>

    )
    
};

export default SendSurvey;