import axios from "axios";
import { FormType } from "./types/formType";

const BASE_URL = "http://localhost:3001/api/v1";

export const getRequest = async (url: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postRequest = async (url: string, data: FormType | {}) => {
  try {
    const response = await axios.post(`${BASE_URL}/${url}`, data);
    return response;
  } catch (error) {
    return error;
  }
};
