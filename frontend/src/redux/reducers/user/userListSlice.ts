import { Dispatch, Action } from "redux";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import employeesService from "../../services/employees";
import { IEmployee, IEmployees } from "../../types/userTypes";

const initialState: IEmployees = {
  employees: [],
};

const employeeSlice: Slice<IEmployees> = createSlice({
  name: "employees",
  initialState,
  reducers: {
    getEmployees: (state, action: PayloadAction<IEmployee[]>) => {
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
