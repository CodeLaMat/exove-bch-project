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


const Question = mongoose.model('question', questionSchema);

module.exports = Question;