import axios from "axios";
import { URL } from "../enum";
import {
  ICreateSurveyPack,
  IParticipant,
  IParticipantInput,
  ISurvey,
  User,
} from "../types/dataTypes";
import Cookies from "js-cookie";

const getAll = async () => {
  const token = Cookies.get("token");
  const response = await axios.get(URL.SURVEYPACKS_URL, {
    withCredentials: true, // set this to true to send cookies with the request
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createSurveyPack = async (
  surveyPack: ICreateSurveyPack
): Promise<ICreateSurveyPack> => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(URL.SURVEYPACKS_URL, surveyPack, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating survey pack:", error);
    throw error;
  }
};

const updatePersonBeingSurveyed = async (
  surveyPackId: string,
  personBeingSurveyed: User[]
): Promise<void> => {
  const token = Cookies.get("token");
  try {
    const response = await axios.patch(
      `${URL.SURVEYPACKS_URL}/surveypacks/${surveyPackId}`,
      {
        personBeingSurveyed,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API response:", response);
  } catch (error) {
    console.error("Error updating personBeingSurveyed:", error);
    throw error;
  }
};

const updateSurvey = async (
  surveyPackId: string,
  survey: ISurvey[]
): Promise<void> => {
  const token = Cookies.get("token");
  try {
    const response = await axios.patch(
      `${URL.SURVEYPACKS_URL}/surveypacks/${surveyPackId}`,
      {
        survey,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API response:", response);
  } catch (error) {
    console.error("Error updating survey:", error);
    throw error;
  }
};

const addParticipant = async (
  surveyPackId: string,
  participant: IParticipantInput
): Promise<void> => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      `${URL.SURVEYPACKS_URL}/surveypacks/${surveyPackId}/participants`,
      {
        participant,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API response:", response);
  } catch (error) {
    console.error("Error adding participant:", error);
    throw error;
  }
};

const updateEmployeesTakingSurvey = async (
  surveyPackId: string,
  updatedParticipants: IParticipantInput[]
): Promise<void> => {
  const token = Cookies.get("token");
  try {
    const response = await axios.patch(
      `${URL.SURVEYPACKS_URL}/surveyors/${surveyPackId}`,
      {
        employeesTakingSurvey: updatedParticipants,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API response:", response);
  } catch (error) {
    console.error("Error updating employeesTakingSurvey:", error);
    throw error;
  }
};

const updateSurveyPack = async (
  id: string,
  updateData: Partial<ICreateSurveyPack>
): Promise<void> => {
  const token = Cookies.get("token");
  try {
    const response = await axios.patch(
      `${URL.SURVEYPACKS_URL}/${id}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API response:", response.data);
  } catch (error) {
    console.error("Error updating survey pack:", error);
    throw error;
  }
};

const updateManager = async (
  surveyPackId: string,
  manager: string
): Promise<void> => {
  const token = Cookies.get("token");
  try {
    const response = await axios.patch(
      `${URL.SURVEYPACKS_URL}/manager-update/${surveyPackId}`,
      {
        manager,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API response:", response);
  } catch (error) {
    console.error("Error updating manager:", error);
    throw error;
  }
};
// const sendReminderEmail = async (userId: string): Promise<void> => {
//   const token = Cookies.get("token");
//   try {
//     const response = await axios.patch(
//       `${URL.SURVEYPACKS_URL}/send-reminder/${userId}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log("API response:", response);
//   } catch (error) {
//     console.error("Error sending reminder email:", error);
//     throw error;
//   }
// };

const sendReminderEmail = async (
  surveyPackId: string,
  personBeingSurveyed: string
): Promise<void> => {
  const token = Cookies.get("token");
  try {
    const response = await axios.patch(
      `${URL.SURVEYPACKS_URL}/send-reminder/${surveyPackId}`,
      { personBeingSurveyed },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API response:", response);
  } catch (error) {
    console.error("Error sending reminder email:", error);
    throw error;
  }
};

export default {
  sendReminderEmail,
  updateSurveyPack,
  updateManager,
  getAll,
  updateEmployeesTakingSurvey,
  updatePersonBeingSurveyed,
  updateSurvey,
  addParticipant,
  createSurveyPack,
};
