import {
  GET_CHAT,
  CHAT_LOADING,
  CLOSE_CHAT,
  GET_MESSAGES,
  SEND_MESSAGE,
  REMOVE_UNREAD_MESSAGES,
} from "./types";
import axios from "axios";
import { Dispatch } from "redux";
import { State } from "../../reducers";

export const getChat =
  (userId: string) => (dispatch: Dispatch, getState: () => State) => {
    dispatch(chatLoading());
    const token = {
      headers: {
        Authorization: getState().auth.token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_URL}chat/${userId}`, token)
      .then((res) =>
        dispatch({
          type: GET_CHAT,
          payload: res.data,
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
export const getMessages =
  (chatId: string) => (dispatch: Dispatch, getState: () => State) => {
    const token = {
      headers: {
        Authorization: getState().auth.token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_URL}chat/${chatId}/messages`, token)
      .then((res) =>
        dispatch({
          type: GET_MESSAGES,
          payload: res.data,
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
export const closeChat = (chatId: string) => {
  return {
    type: CLOSE_CHAT,
    payload: chatId,
  };
};
export const sendMessage =
  (newObj: { chatId: string; userId: string; message: string }) =>
  (dispatch: Dispatch, getState: () => State) => {
    const token = {
      headers: {
        Authorization: getState().auth.token,
      },
    };
    axios
      .post(`${process.env.REACT_APP_URL}chat/messages`, newObj, token)
      .then((res) =>
        dispatch({
          type: SEND_MESSAGE,
          payload: res.data,
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
export const removeUnreadMessages =
  (chatId: string, newObj: { messages: string }) =>
  (dispatch: Dispatch, getState: () => State) => {
    const token = {
      headers: {
        Authorization: getState().auth.token,
      },
    };
    axios
      .put(`${process.env.REACT_APP_URL}chat/${chatId}/messages`, newObj, token)
      .then((res) =>
        dispatch({
          type: REMOVE_UNREAD_MESSAGES,
          payload: res.data,
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

const chatLoading = () => {
  return {
    type: CHAT_LOADING,
  };
};
