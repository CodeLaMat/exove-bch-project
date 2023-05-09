import React from "react";
import { FormCheck, Modal } from "react-bootstrap";
import classes from "./ParticipantSelectionModal.module.css";
import { IEmployee } from "../../../types/userTypes";
import { useTranslation } from "react-i18next";


type ManagerSelectionModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedManager: string;
  onManagerSelect: (managerId: string) => void;
  allEmployees: IEmployee[];
};

const ManagerSelectionModal: React.FC<ManagerSelectionModalProps> = ({
  isOpen,
  onRequestClose,
  selectedManager,
  onManagerSelect,
  allEmployees,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      show={isOpen}
      onHide={onRequestClose}
      className={classes.modal}
      dialogClassName={classes.overlay}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('Select a Manager')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={classes.employeeList}>
          {allEmployees.map((employee) => (
            <div key={employee._id} className={classes.managerItem}>
              <FormCheck
                type="checkbox"
                label={`${employee.firstName} ${employee.surName}`}
                onClick={() => onManagerSelect(employee._id)}
              />
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ManagerSelectionModal;
