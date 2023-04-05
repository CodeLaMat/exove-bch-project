import React, { useState, useEffect } from 'react';
import PageHeading from '../../pageHeading/PageHeading';
import classes from './ListSurveys.module.css'
import axios from 'axios';

const ListSureys = () => {

    interface Question {
        _id: string;
        question: string;
        category: string,
        description: string,
        questionType: string,
      }

    interface Survey {
        _id: string;
        surveyName: string;
        description: string;
        questions: Question[];
      }

    const [surveyList, setsurveyList] = useState<Survey[]>([]);

    useEffect(() => {
        axios.get<Survey[]>("http://localhost:5010/api/v1/surveys")
      .then(response => {
        setsurveyList(response.data);
        
      })
      .catch(error => {
        console.error(error);
        // Add logic to handle the error if needed
      });

      
    }, [setsurveyList]);

    return (
        <div>
        <PageHeading
          pageTitle="List Surveys"
        />
        <div className={classes.top}>
          <div className={classes.maincontent}>
          {surveyList.map((survey) => (
                <div key={survey._id}>
                 Survey id: {survey._id}
                 Survey name: {survey.surveyName}
                 Survey Description: {survey.description}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
};

export default ListSureys;