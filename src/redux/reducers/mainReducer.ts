import { USER_LOADED, USER_LOADING } from "../actions/mainUser/types";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  AUTH_ERROR,
} from "../actions/types";

interface MainUserState {
  isLoading: boolean;
  user: {
    email: string;
    password: string;
    lastName: string;
    gender: string;
    firstName: string;
  } | null;
}

const initialState: MainUserState = {
  isLoading: false,
  user: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: [],
      };
    default:
      return state;
  }
}
