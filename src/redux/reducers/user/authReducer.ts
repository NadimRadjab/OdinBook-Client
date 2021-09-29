import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../../actions/user/types";

interface AuthState {
  token: string | null;
  isAuthenticated: null | boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
};

interface UserLoading {
  type:
    | "USER_LOADING"
    | "USER_LOADED"
    | "LOGIN_FAIL"
    | "REGISTER_FAIL"
    | "AUTH_ERROR"
    | "LOGOUT_SUCCESS";
}
interface LoginRegister {
  type: "LOGIN_SUCCESS" | "REGISTER_SUCCESS";
  payload: { token: string };
}

type Action = UserLoading | LoginRegister;

export default function (state = initialState, action: Action) {
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
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
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
      };
    default:
      return state;
  }
}
