import { UserRole } from "../../enum";

export enum Categories {
  QUALITY = "Quality focus",
  PEOPLE_SKILLS = "People skills",
  SELF_GUIDANCE = "Self guidance",
  LEADERSHIP = "Leadership",
  READINESS_CHANGE = "Readiness for change",
  CREATIVITY = "Creativity",
  GENERAL = "General evaluation",
}

export enum surveyStatus {
  COMPLETED = "Completed",
  OPEN = "Open",
}

export enum Question_Type {
  MULTIPLE = "Multiple choice",
  FREE_FORM = "Free form",
}

export interface QuestionProps {
  _id: string;
  category: Categories;
  question: string;
  questionType: Question_Type;
  description: string;
}

export interface QuestionsType {
  question: QuestionProps[];
}

export interface SurveyType {
  _id: string;
  surveyName: string;
  description: string;
  questions: QuestionProps[];
}

export interface FormData {
  surveyName: string;
  description: string;
  questions: QuestionProps[];
}

export type Response = {
  question: string;
  response: Array<number | string>;
};

export type SectionResponse = {
  name: string;
  responses: Response[];
};

export interface LoginProps {
  onLogin: (role: UserRole) => void;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  handleRoleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedROle: UserRole;
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
