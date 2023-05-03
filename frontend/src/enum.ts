export enum UserRole {
  HR = "hr",
  Manager = "manager",
  User = "user",
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
  LOGIN_URL = "http://localhost:5010/api/v1/users/auth/ldaplogin",
  LOGIN2_URL = "http://localhost:5000/auth",
  SURVEYPACKS_URL = "http://localhost:5010/api/v1/surveyPack/",
}
