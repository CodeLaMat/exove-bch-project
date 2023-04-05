import { URL } from "../src/enum";
const users = require(URL.EMPLOYEES_URL);
const questions = require(URL.QUESTIONS_URL);
const answers = require(URL.RESPONSES_URL);

module.exports = () => ({
  employees: users,
  questions: questions,
  answers: answers,
});
