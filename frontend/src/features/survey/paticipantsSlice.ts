import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  Dispatch,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import employeesService from "../../api/employees";
import { IEmployee } from "../../types/userTypes";
import { IParticipant, IParticipantInput } from "../../types/dataTypes";

interface EmployeesState {
  selectedParticipants: IParticipantInput[];
  participantsApprovalStatus: Record<string, boolean>;
  managerSelected: boolean;
}

const initialState: EmployeesState = {
  selectedParticipants: [],
  participantsApprovalStatus: {},
  managerSelected: false,
};

export const fetchEmployeesData = createAsyncThunk(
  "employees/fetchEmployeesData",
  async () => {
    const employees = await employeesService.getAll();
    return employees;
  }
);

export const selectedEmployeesSlice = createSlice({
  name: "selectedEmployees",
  initialState,
  reducers: {
    selectParticipant: (state, action: PayloadAction<IParticipantInput[]>) => {
      const selectedParticipants = action.payload;
      state.selectedParticipants.push(...selectedParticipants);
    },
    deselectParticipant: (state, action: PayloadAction<string[]>) => {
      const deselectedParticipantIds = action.payload;
      state.selectedParticipants = state.selectedParticipants.filter(
        (participant) =>
          !deselectedParticipantIds.includes(participant.employee)
      );
    },

    removeParticipants: (state) => {
      state.selectedParticipants = [];
    },
    approveParticipant: (state, action: PayloadAction<string>) => {
      state.participantsApprovalStatus[action.payload] = true;
    },
    rejectParticipant: (state, action: PayloadAction<string>) => {
      state.participantsApprovalStatus[action.payload] = false;
    },

    setManagerSelected: (state, action: PayloadAction<boolean>) => {
      state.managerSelected = action.payload;
    },
  },
});

export const {
  selectParticipant,
  deselectParticipant,
  setManagerSelected,
  approveParticipant,
  rejectParticipant,
  removeParticipants,
} = selectedEmployeesSlice.actions;

export const selectAllParticipants =
  () => (dispatch: Dispatch, getState: () => RootState) => {
    const { employees } = getState().employees;
    const participantIds = employees.map((employee: IEmployee) => employee._id);
    const participants: IParticipant[] = participantIds.map((id: string) => ({
      id,
      acceptenceStatus: "Pending",
      isSurveyComplete: false,
      user: "",
    }));
    dispatch(selectParticipant(participants));
  };

export const deselectAllParticipants = () => (dispatch: Dispatch) => {
  const participantIds: string[] = []; // Provide the participantIds here
  dispatch(deselectParticipant(participantIds));
};

export const approveAllParticipants =
  () => (dispatch: Dispatch, getState: () => RootState) => {
    const { selectedParticipants } = getState().employees;
    selectedParticipants.forEach((participant: IParticipant) => {
      dispatch(approveParticipant(participant.id));
    });
  };

export const rejectAllParticipants =
  () => (dispatch: Dispatch, getState: () => RootState) => {
    const { selectedParticipants } = getState().employees;
    selectedParticipants.forEach((participant: IParticipant) => {
      dispatch(rejectParticipant(participant.id));
    });
  };

export const selectParticipantsByIds =
  ({ participantIds, userId }: { participantIds: string[]; userId: string }) =>
  (dispatch: Dispatch) => {
    const participants: IParticipant[] = participantIds.map((id) => ({
      id,
      acceptanceStatus: "Pending",
      isSurveyComplete: false,
      employee: userId,
    }));
    dispatch(selectParticipant(participants));
  };

export const deselectParticipantsByIds =
  (participantIds: string[]) => (dispatch: Dispatch) => {
    dispatch(deselectParticipant(participantIds));
  };

// Export the employees reducer
export default selectedEmployeesSlice.reducer;
