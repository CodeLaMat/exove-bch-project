import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import classes from "./ParticipantSelectionModal.module.css";
import { IEmployee } from "../../../types/userTypes";
import { IParticipant } from "../../../types/dataTypes";
import { useAppDispatch } from "../../../hooks/hooks";
import Form from "react-bootstrap/Form";
import {
  deselectParticipantsByIds,
  selectParticipantsByIds,
} from "../../../features/survey/paticipantsSlice";
import Button from "../../shared/button/Button";

interface ParticipantSelectionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedParticipants: IParticipant[];
  allEmployees: IEmployee[];
  userId: string;
}

const ParticipantSelectionModal: React.FC<ParticipantSelectionModalProps> = ({
  isOpen,
  onRequestClose,
  selectedParticipants,
  allEmployees,
  userId,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    selectedParticipants.map((participant) => participant.id)
  );
  const dispatch = useAppDispatch();

  const handleSelectionChange = (employeeId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, employeeId]);
    } else {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter((id) => id !== employeeId)
      );
    }
  };

  const handleSubmit = () => {
    const newSelectedIds = allEmployees
      .filter((employee) => selectedIds.includes(employee._id))
      .map((employee) => employee._id);

    const deselectedIds = allEmployees
      .filter((employee) => !selectedIds.includes(employee._id))
      .map((employee) => employee._id);

    dispatch(
      selectParticipantsByIds({ participantIds: newSelectedIds, userId })
    );
    dispatch(deselectParticipantsByIds(deselectedIds));

    onRequestClose();
  };

  return (
    <Modal
      show={isOpen}
      onHide={onRequestClose}
      className={classes.modal}
      dialogClassName={classes.overlay}
    >
      <Modal.Header closeButton>
        <Modal.Title>Select Participants</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={classes.employeeList}>
          {allEmployees.map((employee) => {
            const isSelected = selectedIds.includes(employee._id);
            return (
              <div key={employee._id} className={classes.employeeItem}>
                <Form.Check
                  type="checkbox"
                  checked={isSelected}
                  label={`${employee.firstName} ${employee.surName}`}
                  onChange={(e) =>
                    handleSelectionChange(employee._id, e.target.checked)
                  }
                />
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="standard"
          onClick={handleSubmit}
          className={classes.submitButton}
        >
          Update Participants
        </Button>
        <Button
          variant="alert"
          onClick={onRequestClose}
          className={classes.cancelButton}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ParticipantSelectionModal;
