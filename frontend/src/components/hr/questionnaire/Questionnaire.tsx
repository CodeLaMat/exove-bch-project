import React from "react";
import AddQuestion from "./AddQuestions";
import PageHeading from '../../pageHeading/PageHeading';

const Questionnaire = () => {
  return <div>
    
    <PageHeading pageTitle="Questionnaire" />
    
    <div>
      <AddQuestion />
    </div>
    </div>;
};

export default Questionnaire;
