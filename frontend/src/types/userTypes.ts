export interface IEmployee {
  _id: string;
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
  selected?: boolean;
}

export interface IEmployees {
  employees: IEmployee[];
}
