export interface IEmployee {
  _id: string;
  firstName: string;
  surName: string;
  email: string;
<<<<<<< HEAD
  personal: string;
  about: string;
=======
  password: string;
>>>>>>> 4b5e56f (update manager added in controller, surveyPaks slice updated, services updated)
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

export interface IEmployees {
  employees: IEmployee[];
}
