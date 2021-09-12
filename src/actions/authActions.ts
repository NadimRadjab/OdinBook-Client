import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
} from "./types";
import { returnErros } from "./errorActions";
import axios from "axios";
import { Dispatch } from "redux";

interface Login {
  email: string;
  password: string;
}
interface Register {
  email: string;
  password: string;
  lastName: string;
  gender: string;
  firstName: string;
}

export const loadUser = () => (dispatch: Dispatch, getState: any) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("http://localhost:5000/api")
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

export const register =
  ({ email, firstName, password, lastName, gender }: Register) =>
  (dispatch: Dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify({
      email,
      firstName,
      password,
      lastName,
      gender,
    });
    axios
      .post("http://localhost:5000/api/user/register", body, config)
      .then((res) =>
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErros(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

export const login =
  ({ email, password }: Login) =>
  (dispatch: Dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    axios
      .post("http://localhost:5000/api/user/login", body, config)
      .then((res) =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErros(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };
