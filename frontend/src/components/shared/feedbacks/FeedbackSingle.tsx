import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ISurveypack } from "../../../types/dataTypes";

const FeedbackSingle: React.FC = () => {
  const { id } = useParams();
  const [surveyPack, setSurveyPack] = useState<ISurveypack | null>(null);

  const fetchSurveyPack = async () => {
    try {
      const response = await axios.get("http://localhost:4000/surveyPacks");
      const surveyPacks: ISurveypack[] = response.data;
      const selectedSurveyPack = surveyPacks.find((pack) => pack._id === id);

      if (selectedSurveyPack) {
        setSurveyPack(selectedSurveyPack);
      } else {
        console.error("Error: Survey pack not found.");
      }
    } catch (error) {
      console.error("Error fetching survey packs:", error);
    }
  };

  useEffect(() => {
    fetchSurveyPack();
  }, []);

  return (
    <div>
      <h1>Feedback Pack </h1>
      {surveyPack ? (
        <div>
          <p>FeedbackPack ID: {surveyPack._id}</p>
          <p>Creation Date: {surveyPack.creationDate}</p>
          <p>Deadline: {surveyPack.deadline}</p>
          {/* Add more fields to display other survey pack details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FeedbackSingle;
