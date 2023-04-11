import { UserRole } from "../../enum";

export type FormData = {
  question: string;
  type: string;
};

export type Section = {
  name: string;
  description?: string;
  questions: Question[];
};

export type FeedBackQuestions = {
  sections: Section[];
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

export type Question = {
  category: string;
  question: string;
  description?: string;
  isFreeForm: boolean;
};

export type Response = {
  questionID: string;
  userID: string;
  assignedEvaluations: Array<string>;
  evaluatedID: string;
  response: number | string;
  createdAt: Date;
};

export enum UserRoles {
  employee = "employee",
  HR = "hr",
  manager = "manager",
}

export type User = {
  _id?: string;
  firstName?: string;
  surName?: string;
  email?: string;
  password?: string;
  displayName?: string;
  personal?: Record<string, any>;
  about?: Record<string, any>;
  work?: {
    reportsTo: User["_id"];
  };
  title?: string;
  department?: string;
  site?: string;
  startDate?: Date;
  role?: UserRoles;
  image?: String;
};

export interface QuestionModel {
  category: {
    type: string;
    enum: {
      values: Array<string>;
      message: string;
    };
  };
  question: {
    type: string;
    required: [boolean, string];
  };
  description?: {
    type: string;
  };
  isFreeForm: {
    type: boolean;
    default: boolean;
  };
}

export interface UserModel {
  firstName: {
    type: string;
    required: [boolean, string];
    trim: boolean;
    minlenght: number;
    maxlength: number;
  };
  lastName: {
    type: string;
    required: [boolean, string];
    trim: boolean;
    minlenght: number;
    maxlength: number;
  };
  email: {
    type: string;
    required: [boolean, string];
    unique: boolean;
  };
  password: {
    type: string;
    required: [boolean, string];
  };
  displayName: {
    type: string;
  };
  personal?: {
    type: Record<string, any>;
    default: {};
  };
  about?: {
    type: Record<string, any>;
    default: {};
  };
  work?: {
    reportsTo: {
      type: User["_id"];
      ref: string;
    };
  };

  title: {
    type: string;
  };
  department: {
    type: string;
  };
  site?: {
    type: string;
  };
  startDate: {
    type: string;
  };
  role: {
    type: string;
    enum: UserRoles;
  };
  image?: {
    type: string;
  };
}

export interface ResponseModel {
  questionID: {
    type: string;
    ref: string;
    required: boolean;
  };
  userID: {
    type: string;
    ref: string;
    required: boolean;
  };
  evaluatedID: {
    type: string;
    ref: string;
    required: boolean;
  };
  assignedEvaluations: {
    type: Array<string>;
    required: boolean;
  };

  response: {
    type: number | string;
  };
}
