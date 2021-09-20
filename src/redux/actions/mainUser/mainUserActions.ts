import { USER_LOADING, USER_LOADED } from "./types";
import { returnErros } from "../errorActions";
import axios from "axios";
import { Dispatch } from "redux";

export const loadMainProfileUser =
  () => (dispatch: Dispatch, getState: any) => {
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
      });
  };
