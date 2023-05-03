import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import employeesService from "../../api/employees";
import { IEmployee } from "../../types/userTypes";
import { AppDispatch, RootState } from "../../app/store";

export interface IEmployeesState {
  employees: IEmployee[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const storedEmployeesString = sessionStorage.getItem("employees");
const storedEmployees: IEmployee[] = storedEmployeesString
  ? JSON.parse(storedEmployeesString)
  : [];

const initialState: IEmployeesState = {
  employees: storedEmployees || [],
  status: "idle",
  error: null,
};

export const updateManagerAsync = createAsyncThunk(
  "employees/updateManager",
  async ({
    employeeId,
    managerId,
  }: {
    employeeId: string;
    managerId: string;
  }) => {
    await employeesService.updateManager(employeeId, managerId);
    return { employeeId, managerId };
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees: (
      state,
      action: PayloadAction<{ count: number; users: IEmployee[] }>
    ) => {
      state.employees = action.payload.users;
      sessionStorage.setItem("employees", JSON.stringify(action.payload.users));
    },
    updateManager: (
      state,
      action: PayloadAction<{ employeeId: string; managerId: string }>
    ) => {
      const { employeeId, managerId } = action.payload;
      const employeeIndex = state.employees.findIndex(
        (employee) => employee._id === employeeId
      );
      const managerIndex = state.employees.findIndex(
        (employee) => employee._id === managerId
      );
      if (employeeIndex !== -1 && managerIndex !== -1) {
        state.employees[employeeIndex].work = {
          reportsTo: managerId,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateManagerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateManagerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { employeeId, managerId } = action.payload;
        const employeeIndex = state.employees.findIndex(
          (employee) => employee._id === employeeId
        );
        const managerIndex = state.employees.findIndex(
          (employee) => employee._id === managerId
        );
        if (employeeIndex !== -1 && managerIndex !== -1) {
          state.employees[employeeIndex].work = {
            reportsTo: managerId,
          };
        }
      })
      .addCase(updateManagerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setEmployees, updateManager } = employeesSlice.actions;

export const selectEmployees = (state: RootState) => state.employees.employees;

export const initialiseEmployees = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const employees = await employeesService.getAll();
      dispatch(setEmployees(employees));
    } catch (error) {
      // Handle error
    }
  };
};

export default employeesSlice.reducer;
