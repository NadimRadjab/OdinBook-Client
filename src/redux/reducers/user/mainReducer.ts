import {
  LOGIN_SUCCESS,
  SEND_INVITE,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADING,
  USER_LOADED,
} from "../../actions/mainUser/types";

interface MainUserState {
  isLoading: boolean;
  user:
    | {
        email: string;
        password: string;
        lastName: string;
        gender: string;
        firstName: string;
      }[]
    | any;
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
    case SEND_INVITE:
      return {
        ...state,
      };

    default:
      return state;
  }
}
