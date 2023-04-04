import { Dispatch, Action } from "redux";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import employeesService from "../../services/employees";

export interface Employee {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  displayName: string;
  personal: { age: number; gender: string };
  about: { bio: string };
  work: {
    reportsTo: {
      id: number;
      firstName: string;
      surname: string;
      email: string;
    };
    title: string;
    department: string;
    site: string;
    startDate: string;
  };
}

export interface EmployeesData {
  employees: Employee[];
}

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
