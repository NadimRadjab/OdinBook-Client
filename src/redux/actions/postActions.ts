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

interface Post {
  _id: string;
  text: string;
  comments?: {}[];
  author?: {
    _id: string;
    fistName: string;
    lastName: string;
  };
}

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
      // dispatch(returnErros(err.response.data, err.response.status));
    });
};
export const addPost = (post: Post) => (dispatch: Dispatch, getState: any) => {
  const token = {
    headers: {
      Authorization: getState().auth.token,
    },
  };
  axios
    .post("http://localhost:5000/api/posts", post, token)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErros(err.response.data, err.response.status));
    });
};
export const updatePost =
  (id: string, text: any) => (dispatch: Dispatch, getState: any) => {
    const token = {
      headers: {
        Authorization: getState().auth.token,
      },
    };
    axios
      .post(`http://localhost:5000/api/posts/${id}`, text, token)
      .then((res) =>
        dispatch({
          type: UPDATE_POST,
          payload: { id, ...text },
        })
      )
      .catch((err) => {
        dispatch(returnErros(err.response.data, err.response.status));
      });
  };
export const deletePost =
  (id: string) => (dispatch: Dispatch, getState: any) => {
    const token = {
      headers: {
        Authorization: getState().auth.token,
      },
    };
    axios
      .delete(`http://localhost:5000/api/posts/${id}`, token)
      .then((res) =>
        dispatch({
          type: DELETE_POST,
          payload: id,
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