import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../actions/types";

interface AuthState {
  token: string | null;
  isAuthenticated: null | boolean;
  isLoading: boolean;
  user: null | {
    email: string;
    password: string;
    lastName: string;
    gender: string;
    firstName: string;
  };
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

// type Action = LoadUser | LoadedUser | LoginUser;
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
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        isLoading: false,
        user: null,
      };
    default:
      return state;
  }
}
