import React, { useEffect, useState } from "react";
import PageHeading from "../../pageHeading/PageHeading";
import { useAppSelector } from "../../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { UserRole } from "../../../enum";
import classes from "./Feedbacks.module.css";
import { ISurveypack } from "../../../types/dataTypes";
import axios from "axios";
import Button from "../button/Button";

const Feedbacks: React.FC = () => {
  const navigate = useNavigate();

  const userData = useAppSelector((state) => state.loginUser.userData);
  const user = userData[0];
  const role = user.role.join("");

  const handleSurveyPackClick = (id: string) => {
    navigate(`/surveyPack/${id}`);
  };

  const [surveyPacks, setSurveyPacks] = useState<ISurveypack[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/surveyPacks");
        setSurveyPacks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (role === UserRole.HR) {
    return (
      <div className={classes.users_container}>
        <PageHeading pageTitle="Feedbacks" />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>N</th>
              <th>Full Name</th>
              <th>Participants</th>
              <th>Manager Approved</th>
              <th>Status</th>
              <th>Creation date</th>
              <th>Deadline</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {surveyPacks.map((surveyPack, index) => (
              <tr key={surveyPack._id}>
                <td>{index + 1}</td>
                <td>{surveyPack._id}</td>
                <td>{surveyPack.participants.length}</td>
                <td>{surveyPack.managerapproved.toString()}</td>
                <td>{surveyPack.status}</td>
                <td>{surveyPack.creationDate}</td>
                <td>{surveyPack.deadline}</td>
                <td>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => handleSurveyPackClick(surveyPack._id)}
                  >
                    Open
                  </Button>
                </td>
                <td>
                  <Button variant="alert" type="button">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
  return null;
};

export default Feedbacks;
