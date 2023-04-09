export enum UserRole {
  HR = "hr",
  Manager = "manager",
  User = "employee",
}

export enum METHOD {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
  GET_ALL = "GET_ALL",
}

export enum URL {
  EMPLOYEES_URL = "http://localhost:5010/api/v1/users/user",
  QUESTIONS_URL = "http://localhost:5010/api/v1/questions",
  RESPONSES_URL = "./responses.json",
  SURVEYS_URL = "http://localhost:5010/api/v1/surveys",
}
