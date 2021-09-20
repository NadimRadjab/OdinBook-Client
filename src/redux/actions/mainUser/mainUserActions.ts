import { USER_LOADING, USER_LOADED, AUTH_ERROR, SEND_INVITE } from "./types";
import { returnErros } from "../errorActions";
import axios from "axios";
import { Dispatch } from "redux";

export const loadUser = () => (dispatch: Dispatch, getState: any) => {
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
  (id: string) => (dispatch: Dispatch, getState: any) => {
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
