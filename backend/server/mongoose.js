const express = require("express");

const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const config = require("./config");
const Survey = require("./models/Survey");
const Question = require("./models/Question");


const dbUrl = config.dbUrl;

require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(dbUrl);

let questions = [];

  app.get("/list/surveys", async (req, res) => {
    try {
      let survey = await Survey.find();
      res.status(200).json(survey);
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  });
  app.get("/list/questions", async (req, res) => {
    try {
      questions = await Question.find();
      res.status(200).json(questions);
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  });

  app.get("/fillSurvey", async (req, res) => {
    try {
      questions2 = [];
      questionslist = await Question.find();
      questionslist.map((item) => {
        questions2.push(item);
      })

      console.log("questions: ",questions2);
      const survey = new Survey({
        name: 'Example Survey',
        description: 'This is an example survey.',
        questions: questions2,
      });
      
      if (survey.save()) {
        res.status(200).json({
          status: 200,
          message: "Survey saved successfully",
        })
      }
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  });
  
  app.post("/addquestion", async (req, res) => {
    console.log("question: ",req.body.question);
    try {
      const question = new Question({
        question: req.body.question,
        type: req.body.type,
        // add any other necessary fields here
     });
           
      if (question.save()) { 
        res.status(200).json({
          status: 200,
          message: "question saved successfully",
        })
      } 
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  });

app.listen(5000, () => {
    console.log("server running on port 5000");
})