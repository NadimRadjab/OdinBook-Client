import axios from "axios";
import { Dispatch } from "redux";
import { returnErros } from "./errorActions";
import { GET_USERS, LOAD_USERS, GET_USER } from "./types";

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
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

const loadUsers = () => {
  return {
    type: LOAD_USERS,
  };
};
