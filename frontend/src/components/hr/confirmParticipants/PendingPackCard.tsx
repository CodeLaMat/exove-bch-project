import React, { useEffect, useState } from "react";
import { IEmployee, ISurveypack } from "../../../types/dataTypes";
import Button from "../../shared/button/Button";
import { Card, ListGroup } from "react-bootstrap";

interface SurveyPackCardProps {
  surveyPack: ISurveypack;
  employees: IEmployee[];
  handleSurveyPackClick: (userpackid: string) => void;
}

const TeamPackCard: React.FC<SurveyPackCardProps> = ({
  surveyPack,
  employees,
  handleSurveyPackClick,
}) => {
  const [daysLeft, setDaysLeft] = useState<number>(0);

  const isParticipantSelected = surveyPack.employeesTakingSurvey?.length >= 1;

  useEffect(() => {
    const calculateDaysLeft = () => {
      if (!surveyPack) return;
      const now = new Date();
      const deadline = new Date(surveyPack.deadline);
      const difference = deadline.getTime() - now.getTime();
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDaysLeft(days);
    };
    calculateDaysLeft();
    const intervalId = setInterval(calculateDaysLeft, 86400000);

    return () => clearInterval(intervalId);
  }, [surveyPack]);
  return (
    <Card
      style={{
        width: "18rem",
        backgroundColor: isParticipantSelected ? "#87ccae" : "#82c2ff",
      }}
    >
      <Card.Body>
        <Card.Title>
          {surveyPack.personBeingSurveyed &&
            employees.find((e) => e._id === surveyPack.personBeingSurveyed)
              ?.firstName +
              " " +
              employees.find((e) => e._id === surveyPack.personBeingSurveyed)
                ?.surName}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {new Date(surveyPack.createdAt).toLocaleDateString()}
        </Card.Subtitle>
        <ListGroup key="xxl" horizontal="xxl" className="my-2">
          <ListGroup.Item style={{ maxWidth: "30rem" }}>
            Deadline:{" "}
          </ListGroup.Item>
          <ListGroup.Item variant={daysLeft > 0 ? "info" : "danger"}>
            {new Date(surveyPack.deadline).toLocaleDateString()}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>{" "}
      <Button
        variant="primary"
        onClick={() => handleSurveyPackClick(surveyPack._id)}
      >
        View
      </Button>
    </Card>
  );
};

export default TeamPackCard;
