import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { IResponsePack } from "../types/dataTypes";

type ResponseType = IResponsePack & mongoose.Document;

const QuestionResponseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  response: {
    type: String,
  },
});

const SurveyResponsesSchema = new mongoose.Schema({
  employeeTakingSurvey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  allResponses: [QuestionResponseSchema],
});

const ResponsePackSchema = new mongoose.Schema(
  {
    surveyPack: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SurveyPack",
      required: true,
    },
    personBeingSurveyed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    survey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "survey",
      required: true,
    },
    totalResponses: [SurveyResponsesSchema],
    sumResults: {
      "Quality focus": {
        type: Number,
        default: 0,
      },
      "People skills": {
        type: Number,
        default: 0,
      },
      "Self guidance": {
        type: Number,
        default: 0,
      },
      Leadership: {
        type: Number,
        default: 0,
      },
      "Readiness for change": {
        type: Number,
        default: 0,
      },
      Creativity: {
        type: Number,
        default: 0,
      },
    },

    stringResults: {
      "Quality focus": {
        type: [String],
        default: [],
      },
      "People skills": {
        type: [String],
        default: [],
      },
      "Self guidance": {
        type: [String],
        default: [],
      },
      Leadership: {
        type: [String],
        default: [],
      },
      "Readiness for change": {
        type: [String],
        default: [],
      },
      Creativity: {
        type: [String],
        default: [],
      },
      "General Evaluation": {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true }
);
ResponsePackSchema.statics.calculateResults = async function (): Promise<
  ResponseType[]
> {
  const aggregatePipeline: mongoose.Aggregate<ResponseType[]> =
    this.aggregate();
  aggregatePipeline.match({
    "totalResponses.allResponses.question.questionType": "Multiple choice",
  });
  aggregatePipeline.group({
    _id: null,
    "sumResults.Quality focus": {
      $sum: {
        $cond: [
          {
            $and: [
              {
                $eq: [
                  "$totalResponses.allResponses.question.category",
                  "Quality focus",
                ],
              },
              {
                $eq: [
                  "$totalResponses.allResponses.question.questionType",
                  "Multiple choice",
                ],
              },
            ],
          },
          1,
          0,
        ],
      },
    },
    "sumResults.People skills": {
      $sum: {
        $cond: [
          {
            $and: [
              {
                $eq: [
                  "$totalResponses.allResponses.question.category",
                  "People skills",
                ],
              },
              {
                $eq: [
                  "$totalResponses.allResponses.question.questionType",
                  "Multiple choice",
                ],
              },
            ],
          },
          1,
          0,
        ],
      },
    },
    "sumResults.Self guidance": {
      $sum: {
        $cond: [
          {
            $and: [
              {
                $eq: [
                  "$totalResponses.allResponses.question.category",
                  "Self guidance",
                ],
              },
              {
                $eq: [
                  "$totalResponses.allResponses.question.questionType",
                  "Multiple choice",
                ],
              },
            ],
          },
          1,
          0,
        ],
      },
    },
    "sumResults.Leadership": {
      $sum: {
        $cond: [
          {
            $and: [
              {
                $eq: [
                  "$totalResponses.allResponses.question.category",
                  "Leadership",
                ],
              },
              {
                $eq: [
                  "$totalResponses.allResponses.question.questionType",
                  "Multiple choice",
                ],
              },
            ],
          },
          1,
          0,
        ],
      },
    },
    "sumResults.Readiness for change": {
      $sum: {
        $cond: [
          {
            $and: [
              {
                $eq: [
                  "$totalResponses.allResponses.question.category",
                  "Readiness for change",
                ],
              },
              {
                $eq: [
                  "$totalResponses.allResponses.question.questionType",
                  "Multiple choice",
                ],
              },
            ],
          },
          1,
          0,
        ],
      },
    },
    "sumResults.Creativity": {
      $sum: {
        $cond: [
          {
            $and: [
              {
                $eq: [
                  "$totalResponses.allResponses.question.category",
                  "Creativity",
                ],
              },
              {
                $eq: [
                  "$totalResponses.allResponses.question.questionType",
                  "Multiple choice",
                ],
              },
            ],
          },
          1,
          0,
        ],
      },
    },
  });
  aggregatePipeline.group({
    _id: null,
    "stringResults.Quality focus": {
      $push: {
        $cond: [
          {
            $and: [
              {
                $eq: [
                  "$totalResponses.allResponses.question.category",
                  "Quality focus",
                ],
              },
              {
                $eq: [
                  "$totalResponses.allResponses.question.questionType",
                  "Free form",
                ],
              },
            ],
          },
          "$totalResponses.allResponses.response",
          null,
        ],
      },
    },
    "stringResults.People skills": {
      $push: {
        $cond: [
          {
            $and: [
              {
                $eq: [
                  "$totalResponses.allResponses.question.category",
                  "People skills",
                ],
              },
              {
                $eq: [
                  "$totalResponses.allResponses.question.questionType",
                  "Free form",
                ],
              },
            ],
          },
          "$totalResponses.allResponses.response",
          null,
        ],
      },
    },
    "stringResults.Self guidance": {
      $push: {
        $cond: [
          {
            $and: [
              {
                $eq: [
                  "$totalResponses.allResponses.question.category",
                  "Self guidance",
                ],
              },
              {
                $eq: [
                  "$totalResponses.allResponses.question.questionType",
                  "Free form",
                ],
              },
            ],
          },
          "$totalResponses.allResponses.response",
          null,
        ],
      },
    },
    "stringResults.Readiness for change": {
      $push: {
        $cond: [
          {
            $and: [
              {
                $eq: [
                  "$totalResponses.allResponses.question.category",
                  "Readiness for change",
                ],
              },
              {
                $eq: [
                  "$totalResponses.allResponses.question.questionType",
                  "Free form",
                ],
              },
            ],
          },
          "$totalResponses.allResponses.response",
          null,
        ],
      },
    },
    "stringResults.Creativity": {
      $push: {
        $cond: [
          {
            $and: [
              {
                $eq: [
                  "$totalResponses.allResponses.question.category",
                  "Creativity",
                ],
              },
              {
                $eq: [
                  "$totalResponses.allResponses.question.questionType",
                  "Free form",
                ],
              },
            ],
          },
          "$totalResponses.allResponses.response",
          null,
        ],
      },
    },
    "stringResults.General Evaluation": {
      $push: {
        $cond: [
          {
            $and: [
              {
                $eq: [
                  "$totalResponses.allResponses.question.category",
                  "General Evaluation",
                ],
              },
              {
                $eq: [
                  "$totalResponses.allResponses.question.questionType",
                  "Free form",
                ],
              },
            ],
          },
          "$totalResponses.allResponses.response",
          null,
        ],
      },
    },
  });
  aggregatePipeline.project({
    _id: 0,
    sumResults: 1,
    stringResults: 1,
  });

  const result: ResponseType[] = await aggregatePipeline.exec();
  return result;
};

ResponsePackSchema.pre<ResponseType>("save", function (next) {
  const responsePack = this;
  const updatedResponses =
    responsePack.totalResponses?.flatMap(
      (surveyResponse) => surveyResponse.allResponses
    ) ?? [];

  const updatedSumResults: { [key: string]: number } = {};
  const updatedStringResults: { [key: string]: string[] } = {};

  updatedResponses.forEach((response) => {
    const { questionType, category } = response.question;
    const answer = response.response;
    if (questionType === "Multiple choice") {
      if (category && !isNaN(updatedSumResults[category])) {
        updatedSumResults[category] = (updatedSumResults[category] || 0) + 1;
      }
    } else if (questionType === "Free form") {
      if (category && Array.isArray(updatedStringResults[category])) {
        updatedStringResults[category].push(answer);
      }
    }
  });
  responsePack.sumResults = updatedSumResults;
  responsePack.stringResults = updatedStringResults;

  next();
});
const ResponsePack: Model<ResponseType> = mongoose.model<ResponseType>(
  "ResponsePack",
  ResponsePackSchema
);

export default ResponsePack;
