import { Dispatch, Action } from "redux";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import employeesService from "../../services/employees";
import { Employee, EmployeesData } from "../../types/userTypes";

const initialState: EmployeesData = {
  employees: [],
};

const employeeSlice: Slice<EmployeesData> = createSlice({
  name: "employees",
  initialState,
  reducers: {
    getEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
    },
  },
});

export const initialiseEmployees = () => {
  return async (dispatch: Dispatch<Action>) => {
    const employees = await employeesService.getAll();
    dispatch(getEmployees(employees));
  };
};

export const { getEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
