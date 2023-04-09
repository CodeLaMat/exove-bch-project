export interface Employee {
  id: string;
  firstName: string;
  surName: string;
  email: string;
  personal: string;
  about: string;
  work: {
    reportsTo: string;
  };
  title: string;
  department: string;
  site: string;
  startDate: string;
  role: string;
  image: string;
}

export interface EmployeesData {
  employees: Employee[];
}
