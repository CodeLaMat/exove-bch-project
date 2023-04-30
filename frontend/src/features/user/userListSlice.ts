import { Dispatch, Action } from "redux";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import employeesService from "../../api/employees";
import { IEmployee, IEmployees } from "../../types/userTypes";

const storedEmployeesString = sessionStorage.getItem("employees");
const storedEmployees = storedEmployeesString
  ? JSON.parse(storedEmployeesString)
  : [];

const initialState: IEmployees = {
  employees: storedEmployees,
};

const employeeSlice: Slice<IEmployees> = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<IEmployee[]>) => {
      state.employees = action.payload;
      sessionStorage.setItem("employees", JSON.stringify(action.payload));
    },
  },
});

export const initialiseEmployees = () => {
  return async (dispatch: Dispatch<Action>) => {
    const employees = await employeesService.getAll();
    dispatch(setEmployees(employees));
  };
};

export const { setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
