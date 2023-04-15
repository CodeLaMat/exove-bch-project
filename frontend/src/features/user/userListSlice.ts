import { Dispatch, Action } from "redux";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import employeesService from "../../api/employees";
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
      sessionStorage.setItem("employees", JSON.stringify(action.payload));
    },
  },
});

export const initialiseEmployees = () => {
  return async (dispatch: Dispatch<Action>) => {
    const employeesFromStorage = sessionStorage.getItem("employees");
    if (employeesFromStorage) {
      const employees = JSON.parse(employeesFromStorage);
      dispatch(getEmployees(employees));
    } else {
      const employees = await employeesService.getAll();
      dispatch(getEmployees(employees));
    }
  };
};

export const { getEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
