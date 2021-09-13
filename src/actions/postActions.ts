import axios from "axios";
import { Dispatch } from "redux";
import { returnErros } from "./errorActions";
import {
  POSTS_LOADING,
  GET_POSTS,
  DELETE_POST,
  UPDATE_POST,
  ADD_POST,
} from "./types";

export const getPosts = () => (dispatch: Dispatch, getState: any) => {
  dispatch(postLoading());

  const token = {
    headers: {
      Authorization: getState().auth.token,
    },
  };
  axios
    .get("http://localhost:5000/api/posts", token)
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErros(err.response.data, err.response.status));
    });
};

export const postLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};
