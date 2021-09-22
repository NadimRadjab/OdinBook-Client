import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  SEND_INVITE,
  REMOVE_INVITE,
  CANCEL_FRIEND_REQUEST,
  ACCEPT_INVITE,
  REMOVE_FRIEND,
} from "./types";
import { returnErros } from "../errorActions";
import axios from "axios";
import { Dispatch } from "redux";
import { State } from "../../reducers";

export const loadUser = () => (dispatch: Dispatch, getState: () => State) => {
  dispatch({ type: USER_LOADING });
  const config = {
    headers: {
      Authorization: getState().auth.token,
    },
  };
  axios
    .get(`${process.env.REACT_APP_URL}`, config)
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErros(err.response.data, err.response.status));

      dispatch({
        type: AUTH_ERROR,
      });
    });
};
export const sendFriendInvite =
  (id: string) => (dispatch: Dispatch, getState: () => State) => {
    const config = {
      headers: {
        Authorization: getState().auth.token,
      },
    };
    axios
      .post(`${process.env.REACT_APP_URL}friends/${id}/invite`, id, config)
      .then((res) =>
        dispatch({
          type: SEND_INVITE,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(returnErros(err.response.data, err.response.status));
      });
  };
export const cancelFriendInvite =
  (id: string) => (dispatch: Dispatch, getState: () => State) => {
    const config = {
      headers: {
        Authorization: getState().auth.token,
      },
    };
    axios
      .delete(`${process.env.REACT_APP_URL}friends/${id}/invite`, config)
      .then((res) =>
        dispatch({
          type: CANCEL_FRIEND_REQUEST,
          payload: id,
        })
      )
      .catch((err) => {
        dispatch(returnErros(err.response.data, err.response.status));
      });
  };
export const removeFriendInvite =
  (id: string) => (dispatch: Dispatch, getState: () => State) => {
    const config = {
      headers: {
        Authorization: getState().auth.token,
      },
    };
    axios
      .delete(`${process.env.REACT_APP_URL}friends/${id}/remove`, config)
      .then((res) =>
        dispatch({
          type: REMOVE_INVITE,
          payload: id,
        })
      )
      .catch((err) => {
        dispatch(returnErros(err.response.data, err.response.status));
      });
  };
export const acceptFriendInvite =
  (id: string) => (dispatch: Dispatch, getState: () => State) => {
    const config = {
      headers: {
        Authorization: getState().auth.token,
      },
    };
    axios
      .put(`${process.env.REACT_APP_URL}friends/${id}`, id, config)
      .then((res) =>
        dispatch({
          type: ACCEPT_INVITE,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(returnErros(err.response.data, err.response.status));
        console.log(err);
      });
  };
export const removeFriend =
  (id: string, friendId: string) =>
  (dispatch: Dispatch, getState: () => State) => {
    const config = {
      headers: {
        Authorization: getState().auth.token,
      },
    };
    axios
      .delete(`${process.env.REACT_APP_URL}friends/${friendId}`, config)
      .then((res) =>
        dispatch({
          type: REMOVE_FRIEND,
          payload: { id, friendId },
        })
      )
      .catch((err) => {
        dispatch(returnErros(err.response.data, err.response.status));
      });
  };
