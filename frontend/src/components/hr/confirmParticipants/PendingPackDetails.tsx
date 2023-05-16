import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { RootState } from "../../../app/store";
import { IEmployee, IParticipant, ISurveypack } from "../../../types/dataTypes";
import classes from "./PendingPackDetails.module.css";
import Button from "../../shared/button/Button";
import { Card, ListGroup, Modal, Toast } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import SelectMyManager from "./SelectManager";
import SelectMyParticipants from "./SelecParticipants";
import {
  updateSurveyPack,
  sendReminderEmailToUser,
} from "../../../features/survey/surveyPacksSlice";
import { useTranslation } from "react-i18next";

const SurveyPackDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedManager, setSelectedManager] = useState(null);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [showManagerModal, setShowManagerModal] = useState(false);
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const { surveyid } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const surveyPacks: ISurveypack[] = useAppSelector(
    (state: RootState) => state.surveyPacks.surveyPacks
  );
  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );

  const surveyPacksArray = Object.values(surveyPacks);
  const cleanedSurveyPacks = Object.values(surveyPacksArray[0]);
  const surveyPack = cleanedSurveyPacks.find((pack) => pack._id === surveyid);
  const manager = employees.find((e) => e._id === surveyPack.manager);

  const managerSelected = useAppSelector(
    (state: RootState) => state.selectedParticipants.managerSelected
  );

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

  if (!surveyPack) {
    return <div>{t("Survey pack not found")}</div>;
  }

  console.log(daysLeft);

  const personBeingSurveyed = employees.find(
    (e) => e._id === surveyPack.personBeingSurveyed
  );

  const participantNames = surveyPack.employeesTakingSurvey
    ?.map((participant: IParticipant) => {
      const foundEmployee = employees.find(
        (e) => e._id === participant.employee
      );
      return foundEmployee
        ? `${foundEmployee.firstName} ${foundEmployee.surName}`
        : null;
    })
    .filter((name: string) => name)
    .join(", ");

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenManagerModal = () => {
    setShowManagerModal(true);
  };
  const handleCloseManagerModal = () => {
    setShowManagerModal(false);
  };

  const confirmParticipants = () => {
    dispatch(
      updateSurveyPack({
        surveyPackId: surveyPack._id,
        changes: { hrapproved: true },
      })
    );
    setIsConfirmed(true);
    setTimeout(() => {
      setIsConfirmed(false);
    }, 3000);
  };

  const handleSendReminderEmail = (
    surveyPackId: string,
    personBeingSurveyedId: string
  ) => {
    dispatch(
      sendReminderEmailToUser({
        surveyPackId,
        personBeingSurveyed: personBeingSurveyedId,
      })
    );
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
    }, 3000);
  };

  const isSixParticipants = surveyPack.employeesTakingSurvey?.length === 6;

  return (
    <div className={classes.surveyPackDetails}>
      <Card style={{ maxWidth: "80rem" }}>
        <Card.Header className="text-center">{t("Survey Pack Details")}</Card.Header>
        <Card.Body>
          <Card.Title> {t("Person Being Surveyed")}:</Card.Title>
          <Card.Text>
            {personBeingSurveyed?.firstName +
              " " +
              personBeingSurveyed?.surName}
          </Card.Text>
          <ListGroup key="xxl" horizontal="xxl" className="my-2">
            <ListGroup.Item style={{ width: "30rem" }}>
            {t("Created at")}:
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              {new Date(surveyPack.createdAt).toLocaleDateString()}
            </ListGroup.Item>
          </ListGroup>{" "}
          <ListGroup key="xxl" horizontal="xxl" className="my-2">
            <ListGroup.Item style={{ width: "30rem" }}>
            {t("Deadline")}:{" "}
            </ListGroup.Item>
            <ListGroup.Item variant={daysLeft > 0 ? "info" : "danger"}>
              {new Date(surveyPack.deadline).toLocaleDateString()}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup key="xxl" horizontal="xxl" className="my-2">
            <ListGroup.Item style={{ width: "30rem" }}>{t("Status")}: </ListGroup.Item>
            <ListGroup.Item variant="info">{surveyPack.status}</ListGroup.Item>
          </ListGroup>
          <ListGroup key="xxl" horizontal="xxl" className="my-2">
            <ListGroup.Item style={{ width: "30rem" }}>
            {t("Manager")}:{" "}
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              {manager?.firstName + "" + manager?.surName}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup key="xxl" horizontal="xxl" className="my-2">
            <ListGroup.Item style={{ width: "30rem" }}>
            {t("Manager Approved")}:{" "}
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              {surveyPack.managerapproved ? "Yes" : "No"}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup key="xxl" horizontal="xxl" className="my-2">
            <ListGroup.Item style={{ width: "30rem" }}>
            {t("HR Approved")}:{" "}
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              {surveyPack.hrapproved ? "Yes" : "No"}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup key="xxl" horizontal="xxl" className="my-2">
            <ListGroup.Item style={{ width: "30rem" }}>
            {t("Participants of this survey")}:{" "}
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              {participantNames
                ? participantNames
                : "No participants assigned yet"}
            </ListGroup.Item>
          </ListGroup>{" "}
          <div>
            {surveyPack.employeesTakingSurvey.length > 0 &&
            !surveyPack.hrapproved ? (
              <Button variant="primary" onClick={confirmParticipants}>
                {t("Confirm Participants")}
              </Button>
            ) : null}{" "}
            <Button variant="secondary" onClick={handleOpenManagerModal}>
            {t("Change Participants")}
            </Button>{" "}
            {managerSelected && (
              <Button variant="secondary" onClick={handleOpenModal}>
                {t("Select Participants")}
              </Button>
            )}{" "}
            {daysLeft <= 0 && (
              <Button
                variant="alert"
                onClick={() =>
                  handleSendReminderEmail(
                    surveyPack._id,
                    surveyPack.personBeingSurveyedId
                  )
                }
              >
                {t("Send Reminder")}
              </Button>
            )}
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          {daysLeft > 0
            ? `${t("Days left until deadline")}: ${daysLeft}`
            : `${t("Deadline has passed")}`}
        </Card.Footer>
      </Card>{" "}
      <Modal show={showManagerModal} onHide={handleCloseManagerModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Select Manager")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes.modalBody}>
          <SelectMyManager
            setSelectedManager={setSelectedManager}
            surveyPackId={surveyPack._id}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseManagerModal}>
          {t("Close")}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Select Participants")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes.modalBody}>
          <SelectMyParticipants surveyPackId={surveyPack._id} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
          {t("Close")}
          </Button>
        </Modal.Footer>
      </Modal>{" "}
      <div className={classes.toastContainer}>
        <Toast className={classes.toast} show={isSent} autohide bg="info">
          <Toast.Header>
            <strong className="mr-auto">{t("Email has been sent")}.</strong>
          </Toast.Header>
          <Toast.Body>
          {t("The reminding email has been sent to the employee")}.
          </Toast.Body>
        </Toast>
      </div>
      <div className={classes.toastContainer}>
        <Toast className={classes.toast} show={isConfirmed} autohide bg="info">
          <Toast.Header>
            <strong className="mr-auto">{t("Email has been sent")}.</strong>
          </Toast.Header>
          <Toast.Body>
          {t("The reminding email has been sent to the employee")}.
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default SurveyPackDetails;
