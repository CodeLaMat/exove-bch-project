const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    question: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

const surveySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;