import React, { useEffect, useState } from "react";
import classes from "./SelectEmployee.module.css";
import { IEmployee } from "../../../types/userTypes";
import { RootState } from "../../../app/store";
import { useAppSelector } from "../../../hooks/hooks";
import { useParams } from "react-router";
import PageHeading from "../../pageHeading/PageHeading";
import ManagerSelectionModal from "./ManagerSelectionModal";
import { setSurveyManager } from "../../../features/survey/surveyPackSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { updateManagerAsync } from "../../../features/user/employeesSlice";
import Button from "../../shared/button/Button";
import { useTranslation } from "react-i18next";

const SelectEmployee: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userid } = useParams();
  const userId = userid ?? "";
  const [selectedManager, setSelectedManager] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [userID, setuserID] = useState("");
  const [manager, setManager] = useState("");
  const [managerFirstName, setManagerFirstName] = useState("");
  const [managerLastName, setManagerLastName] = useState("");
  const [managerTitle, setManagerTitle] = useState("");
  const [managerImage, setManagerImage] = useState("");
  const { t } = useTranslation();

  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const sortedEmployees = [...employees].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  useEffect(() => {
    const selectedEmployee = employees.find(
      (employee) => employee._id === userid
    );

    if (selectedEmployee) {
      const { firstName, surName, title, image, _id, work } = selectedEmployee;
      setFirstName(firstName);
      setLastName(surName);
      setTitle(title);
      setImage(image);
      setuserID(_id);
      setManager(work.reportsTo);
      dispatch(setSurveyManager(work.reportsTo));
    }
  }, [userid, employees]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (manager) {
      const selectedManager = employees.find(
        (employee) => employee._id === manager
      );

      if (selectedManager) {
        const { firstName, surName, title, image } = selectedManager;
        setManagerFirstName(firstName);
        setManagerLastName(surName);
        setManagerTitle(title);
        setManagerImage(image);
      }
    }
  }, [manager, employees]);

  const handleManagerSelection = (managerId: string) => {
    dispatch(updateManagerAsync({ employeeId: userId, managerId }));
    setSelectedManager(managerId);
    setIsModalOpen(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.cardsContainer}>
        <div className={classes.cardContainer}>
          {" "}
          <PageHeading pageTitle={t("Selected employee")} />
          <div key={userID} className={classes.employeeCard}>
            <div className={classes.employeeImage}>
              {image === "" ? (
                <img
                  className={classes.employee_roundImage}
                  src={image}
                  alt={`${firstName} ${lastName}`}
                />
              ) : (
                <div className={classes.employee_placeholder}>
                  <h2>{`${firstName[0]}${lastName[0]}`}</h2>
                </div>
              )}
            </div>
            <div className={classes.details}>
              <h5>
                {firstName} {lastName}
              </h5>
              <p>{title}</p>
            </div>
          </div>
        </div>
        <div className={classes.cardContainer}>
          {" "}
          <PageHeading pageTitle={t("Manager")} />{" "}
          <Button variant="standard" onClick={openModal}>
            {t("Change Manager")}
          </Button>
          <div key={manager} className={classes.employeeCard}>
            <div className={classes.employeeImage}>
              {managerImage === "" ? (
                <img
                  className={classes.employee_roundImage}
                  src={managerImage}
                  alt={`${managerFirstName} ${managerLastName}`}
                />
              ) : (
                <div className={classes.employee_placeholder}>
                  <h2>{`${managerFirstName[0]}${managerLastName[0]}`}</h2>
                </div>
              )}
            </div>
            <div className={classes.details}>
              <h5>
                {managerFirstName} {managerLastName}
              </h5>
              <p>{managerTitle}</p>
            </div>
          </div>
        </div>
      </div>
      <ManagerSelectionModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        selectedManager={selectedManager}
        onManagerSelect={handleManagerSelection}
        allEmployees={sortedEmployees}
      />
    </div>
  );
};

export default SelectEmployee;
