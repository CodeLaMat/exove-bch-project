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
    setEmployees: (state, action: PayloadAction<IEmployee[]>) => {
      state.employees = action.payload;
      sessionStorage.setItem("employees", JSON.stringify(action.payload));
    },
  },
});

export const initialiseEmployees = () => {
  return async (dispatch: Dispatch<Action>) => {
    const employees = await employeesService.getAll();
    console.log("eployeeListSlice", employees);
    dispatch(setEmployees(employees));
  };
};

export const { setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
