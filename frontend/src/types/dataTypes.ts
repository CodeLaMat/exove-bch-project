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

export enum surveyStatus {
  COMPLETED = "Completed",
  OPEN = "Open",
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

export interface FormData {
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
  acceptencestatus: "declined" | "approved";
  role: string;
  status: "filled" | "open";
}

export interface ISurveypack {
  _id: string;
  creationDate: Date;
  surveySubject: string[];
  survey: ISurvey[];
  participants: IParticipant[];
  deadline: Date;
  status: "open" | "closed" | "inprogress";
  managerapproved: boolean;
  hrapproved: boolean;
  manager: string[];
}
