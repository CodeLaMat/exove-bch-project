// export type Question = {
//   category: string;
//   question: string;
//   description?: string;
//   isFreeForm: boolean;
// };

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
  _id: string;
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
  role: UserRoles;
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
  questionType: {
    type: boolean;
    enum: Question_Type;
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

export enum SurveyPackStatus {
  OPEN = "Open",
  INPROGRESS = "in_progress",
  CLOSED = "Closed",
}

export enum SurveyorsAcceptance {
  DECLINED = "Declined",
  APPROVED = "Approved",
  PENDING = "Pending",
}

export enum SurveyorsStatus {
  FILLED = "filled",
  OPEN = "Open",
}
export interface IQuestion {
  _id: string;
  category: Categories;
  question: string;
  questionType: Question_Type;
  description?: string;
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

// export interface ISurveys {
//   surveys: ISurvey[];
// }
export interface IParticipant {
  id?: string;
  employee: User[];
  acceptencestatus: SurveyorsAcceptance;
  isSurveyComplete: boolean;
}

export interface ISurveypack {
  _id: string;
  createdAt: Date;
  personBeingSurveyed: User;
  survey: ISurvey;
  employeesTakingSurvey: IParticipant[];
  deadline: Date;
  status: SurveyPackStatus;
  manager: User;
  managerapproved: boolean;
  hrapproved: boolean;
}
