import { UserRole } from "../enum";

export enum Categories {
  QUALITY = "Quality focus",
  PEOPLE_SKILLS = "People skills",
  SELF_GUIDANCE = "Self guidance",
  LEADERSHIP = "Leadership",
  READINESS_CHANGE = "Readiness for change",
  CREATIVITY = "Creativity",
  GENERAL = "General evaluation",
}

export type QuestionsByCategory = {
  [key in Categories]: IQuestion[];
};

export enum SurveyPackStatus {
  OPEN = "Open",
  INPROGRESS = "in_progress",
  CLOSED = "Closed",
}

export enum Question_Type {
  MULTIPLE = "Multiple choice",
  FREE_FORM = "Free form",
}

export interface IQuestion {
  _id: string;
  category: Categories;
  question: string;
  questionType: Question_Type;
  description: string;
}

export interface IQuestions {
  question: IQuestion[];
}

export interface ISurvey {
  _id: string;
  surveyName: string;
  description: string;
  questions: IQuestion[];
}

export interface ISurveys {
  surveys: ISurvey[];
}

export interface SurveyFormData {
  surveyName: string;
  description: string;
  questions: IQuestion[];
}

export type RouteConfig = {
  [key in UserRole]: {
    path: string;
    element: JSX.Element;
    children: {
      path: string;
      element: JSX.Element;
    }[];
  }[];
};

export interface IParticipant {
  id: string;
  acceptanceStatus: "Pending" | "Approved" | "Declined";
  isSurveyComplete: boolean;
  employee: string;
}

export interface IEmployeesTakingSurvey {
  acceptanceStatus: "Pending" | "Approved" | "Declined";
  isSurveyComplete: boolean;
  employee: string;
}

export type User = {
  _id: string;
  firstName?: string;
  surName?: string;
  email?: string;
  password?: string;
  displayName?: string;
  personal?: Record<string, any>;
  about?: Record<string, any>;
  work?: {
    reportsTo: string;
  };
  title?: string;
  department?: string;
  site?: string;
  startDate?: Date;
  role: UserRole;
  image?: String;
};

export interface IEmployee {
  _id?: string;
  firstName: string;
  surName: string;
  email: string;
  password: string;
  displayName: string;
  personal: Record<string, any>;
  about: Record<string, any>;
  work: {
    reportsTo: string;
  };
  title: string;
  department: string;
  site: string;
  startDate: Date;
  role: UserRole;
  image: string;
}

export interface ISurveyPacks {
  surveyPacks: ISurveypack[];
}

export interface ISurveypack {
  _id: string;
  createdAt: Date;
  personBeingSurveyed: User["_id"];
  survey: ISurvey[];
  employeesTakingSurvey: IParticipant[];
  deadline: Date;
  status: SurveyPackStatus;
  manager: string;
  managerapproved: boolean;
  hrapproved: boolean;
}

export interface ICreateSurveyPack {
  _id?: string;
  createdAt?: string;
  personBeingSurveyed: User["_id"];
  survey: string;
  employeesTakingSurvey: IParticipant[];
  deadline: Date;
  status: SurveyPackStatus;
  manager: string;
  managerapproved: boolean;
  hrapproved: boolean;
}
