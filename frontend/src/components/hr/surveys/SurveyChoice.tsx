import React from 'react';
import classes from './SurveyChoice.module.css'
import PageHeading from '../../pageHeading/PageHeading';
import { NavLink } from 'react-router-dom';

const Surveychoice = () => {
    return (
        <div>
        <PageHeading
          pageTitle="Choose Survey action"
        />
        <div className={classes.top}>
          <div className={classes.maincontent}>
            <button> <NavLink to="/createsurvey">Create Survey</NavLink></button>
            <button> <NavLink to="/listsurvey">list Surveys</NavLink></button>
          </div>
        </div>
      </div>
    );
};

export default Surveychoice;