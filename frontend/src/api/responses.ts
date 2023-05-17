import axios from "axios";
import { URL } from "../enum";
// import { IResponseInput } from "../types/dataTypes";
import Cookies from "js-cookie";
import { User } from "../types/dataTypes";

export interface ISurveyResponses {
  _id?: string;
  allResponses: IResponseInput[];
  employeeIdTakingSurvey: string;
}

export interface IResponsePack {
  _id: string;
  survey: string;
  surveyPack: string;
  totalResponses: ISurveyResponses[];
  createdAt: Date;
}

export interface IResponsePacks {
  responsePacks: IResponsePack[];
}

export interface IResponse {
  question: string;
  response: string;
}

export interface IResponseInput {
  allResponses: IResponse[];
}

const getAll = async () => {
  const token = Cookies.get("token");
  const response = await axios.get(URL.RESPONSES_URL, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getSingleResponse = async (responsePackId: string) => {
  const token = Cookies.get("token");
  const response = await axios.get(`${URL.RESPONSES_URL}/${responsePackId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const addResponse = async (
  responsePackId: string,
  responseInput: IResponseInput
) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      `${URL.RESPONSES_URL}/${responsePackId}`,
      responseInput,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding response:", error);
    throw error;
  }
};

const updateResponsePack = async (
  responsePackId: string,
  responseInput: IResponseInput
) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.patch(
      `${URL.RESPONSES_URL}/${responsePackId}`,
      responseInput,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating response:", error);
    throw error;
  }
};

const showStats = async () => {
  const token = Cookies.get("token");
  const response = await axios.get(`${URL.RESPONSES_URL}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  getAll,
  getSingleResponse,
  addResponse,
  updateResponsePack,
  showStats,
};
