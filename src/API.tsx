import axios, { AxiosError, AxiosResponse } from "axios";
import { CityType } from "./types/cityType";
import { CourseType } from "./types/courseType";
import { EventType } from "./types/eventType";
import { FormType } from "./types/formType";

interface MsgType {
  msg: string;
}

const baseURL = "https://registration-api-gce3.onrender.com/api/v1";

const api = axios.create({
  baseURL,
});

export const getRequest = async (
  url: string
): Promise<CityType[] | EventType[] | CourseType[] | any> => {
  try {
    const response = await api.get(`/${url}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<MsgType>;

      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { msg: "Something went wrong! " };
  }
};

export const postRequest = async (
  url: string,
  data: FormType | {}
): Promise<AxiosResponse | MsgType> => {
  try {
    const response = await api.post<AxiosResponse>(`/${url}`, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<MsgType>;

      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { msg: "Something went wrong! " };
  }
};

export const deleteRequest = async (url: string): Promise<MsgType> => {
  try {
    const response = await api.delete(`/${url}`);
    const msg: { msg: string } = response.data;
    return msg;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<MsgType>;

      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { msg: "Something went wrong! " };
  }
};
