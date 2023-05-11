import React from "react";
import { IEmployee, ISurveypack } from "../../../../types/dataTypes";
import Button from "../../../shared/button/Button";
import { Card, ListGroup } from "react-bootstrap";

interface SurveyPackCardProps {
  surveyPack: ISurveypack;
  employees: IEmployee[];
  handleSurveyPackClick: (userpackid: string) => void;
}

const MySurveyPackCard: React.FC<SurveyPackCardProps> = ({
  surveyPack,
  employees,
  handleSurveyPackClick,
}) => {
  return (
    <Card style={{ width: "18rem" }}>
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
          <ListGroup.Item variant="info">
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

export default MySurveyPackCard;
