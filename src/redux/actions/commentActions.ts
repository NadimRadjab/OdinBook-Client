import {
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS,
  COMMENTS_LOADING,
} from "./types";
import axios from "axios";
import { Dispatch } from "redux";
import { returnErros } from "./errorActions";

export const getComments = () => (dispatch: Dispatch, getState: any) => {
  dispatch(isCommentsLoading());
  const token = {
    headers: {
      Authorization: getState().auth.token,
    },
  };
  axios
    .get(`${process.env.REACT_APP_URL}posts/comments`, token)
    .then((res) =>
      dispatch({
        type: GET_COMMENTS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErros(err.response.data, err.response.status));
    });
};

export const addComment =
  (id: string, comment: any) => (dispatch: Dispatch, getState: any) => {
    const token = {
      headers: {
        Authorization: getState().auth.token,
      },
    };
    axios
      .post(`${process.env.REACT_APP_URL}posts/${id}/comments`, comment, token)
      .then((res) =>
        dispatch({
          type: ADD_COMMENT,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(returnErros(err.response.data, err.response.status));
      });
  };
export const deleteComment =
  (id: string, commentId: string) => (dispatch: Dispatch, getState: any) => {
    const token = {
      headers: {
        Authorization: getState().auth.token,
      },
    };
    axios
      .delete(
        `${process.env.REACT_APP_URL}posts/${id}/comments/${commentId}`,
        token
      )
      .then((res) =>
        dispatch({
          type: DELETE_COMMENT,
          payload: commentId,
        })
      )
      .catch((err) => {
        dispatch(returnErros(err.response.data, err.response.status));
      });
  };
const isCommentsLoading = () => {
  return {
    type: COMMENTS_LOADING,
  };
};
