import { UserRole } from "../../enum";

export type Question = {
  question: string;
  isFreeForm: boolean;
};

export type Section = {
  name: string;
  description?: string;
  questions: Question[];
};

export type FeedBackQuestions = {
  sections: Section[];
};

export type Response = {
  question: string;
  response: Array<number | string>;
};

export type SectionResponse = {
  name: string;
  responses: Response[];
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
