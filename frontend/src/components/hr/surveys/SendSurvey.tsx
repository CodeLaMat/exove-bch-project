import React, { useEffect, useState } from 'react';
import classes from "./CreateSurvey.module.css";
import PageHeading from '../../pageHeading/PageHeading';
import { Accordion, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Form from "react-bootstrap/Form";
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { IEmployee } from '../../../types/userTypes';
import { ISurvey } from "../../../types/dataTypes";
import axios from 'axios';
import { RootState } from "../../../app/store";
import { initialiseSurveys } from "../../../features/survey/surveysSlice";

const SendSurvey = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState<IEmployee[][]>([]);
    const [manager, setManager] = useState<IEmployee[]>([]);
    const employeesList = useAppSelector((state) => state.employees.employees);

    const surveys: ISurvey[] = useAppSelector(
        (state: RootState) => state.surveys.surveys
      );
      useEffect(() => {
        dispatch(initialiseSurveys());
      }, [dispatch]);

    const getUserId = async (userid: string): Promise<IEmployee[]> => {
        let user: IEmployee[] = [];  
      
        try {
          const response = await axios.get<IEmployee[]>(`http://localhost:5010/api/v1/users/user/${userid}`);
          user = Object.values(response.data);
          console.log("response", response.data);
        } catch (error) {
          console.error(error);
          // Add logic to handle the error if needed
          user = [];
        }
        return user;
      };


    const changeHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
       console.log(e.target.value);
       let userid = e.target.value;
       const employee = employeesList.users.find((emp: IEmployee) => emp._id === userid);

       console.log('user', employee);
       console.log('reports to', employee.work.reportsTo);
       
       await loadManager(employee.work.reportsTo)
       
       console.log("everything complete");
       console.log("manager", manager);
        
    };

    
    console.log('manager1', manager);
    const loadManager = async(userid: string) => {  
        console.log('managerId5', userid);
        const result = await getUserId(userid)
        console.log("result", result);
        setManager(result);
    }

   
    console.log('manager1', manager);
   

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
                        <label>Select survey</label>
                        <select
                            name="selection"
                            id="selection"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                changeHandler(e)
                            }
                        >
                            { surveys.map((survey: ISurvey) => (
                                <option key={survey._id} value= {survey._id} >{survey.surveyName} </option>
                            ))}
                        </select>
                    </div>
                    <div className={classes.formSelect}>
                        <label>Employee to be surveyed</label>
                        <select
                            name="selection"
                            id="selection"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                changeHandler(e)
                            }
                        >
                            <option value= "selectuser" >Select User</option>
                            { employeesList.users.map((user: IEmployee) => (
                                <option value= {user._id} >{user.surName} {user.firstName} </option>
                            ))}
                        </select>
                    </div>
                    
                    
                    <label>
                        Manager: {manager.length > 0 ? `${manager[0].surName} ${manager[0].firstName}`  : ''}
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