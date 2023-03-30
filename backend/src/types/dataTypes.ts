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

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  jobProfile: string;
  department: string;
  image: File;
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
  jobProfile: {
    type: string;
  };
  department: {
    type: string;
  };
  image: {
    type: File;
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
  createdAt: {
    type: Date;
    default: Date;
  };
}
