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
