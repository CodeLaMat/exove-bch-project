import React from 'react';
import classes from './Surveychoice.module.css'
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
            <button> <NavLink to="/createSurvey">Create Survey</NavLink></button>
            <button> <NavLink to="/listSurvey">list Surveys</NavLink></button>
          </div>
        </div>
      </div>
    );
};

export default Surveychoice;