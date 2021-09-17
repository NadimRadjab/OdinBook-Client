import axios from "axios";
import { Dispatch } from "redux";
import { returnErros } from "./errorActions";
import {
  POSTS_LOADING,
  GET_POSTS,
  DELETE_POST,
  UPDATE_POST,
  ADD_POST,
  LIKE_POST,
  UNLIKE_POST,
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
    .get(`${process.env.REACT_APP_URL}posts`, token)
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
    .post(`${process.env.REACT_APP_URL}posts`, post, token)
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
      .post(`${process.env.REACT_APP_URL}posts/${id}`, text, token)
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
      .delete(`${process.env.REACT_APP_URL}posts/${id}`, token)
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
export const likePost = (id: string) => (dispatch: Dispatch, getState: any) => {
  const token = {
    headers: {
      Authorization: getState().auth.token,
    },
  };
  axios
    .post(`${process.env.REACT_APP_URL}posts/${id}/like`, id, token)
    .then((res) =>
      dispatch({
        type: LIKE_POST,
        payload: { like: res.data, id },
      })
    )
    .catch((err) => {
      dispatch(returnErros(err.response.data, err.response.status));
    });
};
export const unlikePost =
  (id: string) => (dispatch: Dispatch, getState: any) => {
    const token = {
      headers: {
        Authorization: getState().auth.token,
      },
    };
    axios
      .post(`${process.env.REACT_APP_URL}posts/${id}/like`, id, token)
      .then((res) =>
        dispatch({
          type: UNLIKE_POST,
          payload: { likeId: res.data, id },
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
