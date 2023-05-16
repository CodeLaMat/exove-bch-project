import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { IResponsePack } from "../types/dataTypes";

type ResponseType = IResponsePack & mongoose.Document;

interface ICategoryResult {
  category: string;
  sumResponse: number;
}

const QuestionResponseSchema = new mongoose.Schema({
  questionId: {
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
    result: [
      {
        category: {
          type: String,
        },
        sumResponse: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

ResponsePackSchema.statics.calculateSumResponse = async function (
  personBeingSurveyedId: mongoose.Types.ObjectId
): Promise<ICategoryResult[]> {
  const result: ICategoryResult[] = await this.aggregate([
    {
      $match: {
        personBeingSurveyed: personBeingSurveyedId,
      },
    },
    {
      $unwind: "$totalResponses",
    },
    {
      $unwind: "$totalResponses.allResponses",
    },
    {
      $lookup: {
        from: "questions",
        localField: "totalResponses.allResponses.question",
        foreignField: "_id",
        as: "question",
      },
    },
    {
      $unwind: "$question",
    },
    {
      $match: {
        "question.questionType": "Multiple choice",
      },
    },
    {
      $addFields: {
        responseValue: {
          $convert: {
            input: "$totalResponses.allResponses.response",
            to: "double",
            onError: 0,
            onNull: 0,
          },
        },
      },
    },
    {
      $group: {
        _id: {
          category: "$question.category",
        },
        sumResponse: {
          $sum: "$responseValue",
        },
      },
    },
  ]);
  return result;
};

const ResponsePack: Model<ResponseType> = mongoose.model<ResponseType>(
  "ResponsePack",
  ResponsePackSchema
);

export default ResponsePack;
