import axios from "axios";
import { Dispatch } from "redux";
import {
  GET_USERS,
  LOAD_USERS,
  GET_USER,
  GET_USER_POSTS,
  LOAD_USER_POSTS,
  UPDATE_MAIN_USER_IMAGE,
} from "./types";

export const getUsers =
  (name: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      const config = {
        headers: {
          Authorization: getState().auth.token,
        },
      };
      dispatch(loadUsers());
      const res = await axios.get(
        `${process.env.REACT_APP_URL}s?name=${name}`,
        config
      );
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
export const getUser =
  (id: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      const config = {
        headers: {
          Authorization: getState().auth.token,
        },
      };
      dispatch(loadUsers());
      const res = await axios.get(`${process.env.REACT_APP_URL}${id}`, config);
      dispatch({
        type: GET_USER,
        payload: res.data.user,
      });
    } catch (err) {
      console.log(err);
    }
  };
export const getUserPosts =
  (id: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      const config = {
        headers: {
          Authorization: getState().auth.token,
        },
      };
      dispatch(loadPosts());
      const res = await axios.get(
        `${process.env.REACT_APP_URL}${id}/posts`,
        config
      );
      dispatch({
        type: GET_USER_POSTS,
        payload: res.data.posts,
      });
    } catch (err) {
      console.log(err);
    }
  };
export const updateImage =
  (file: any) => async (dispatch: Dispatch, getState: any) => {
    try {
      const config = {
        headers: {
          Authorization: getState().auth.token,
        },
      };
      const res = await axios.post(
        `${process.env.REACT_APP_URL}`,
        file,
        config
      );
      dispatch({
        type: UPDATE_MAIN_USER_IMAGE,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
const loadPosts = () => {
  return {
    type: LOAD_USER_POSTS,
  };
};

const loadUsers = () => {
  return {
    type: LOAD_USERS,
  };
};
