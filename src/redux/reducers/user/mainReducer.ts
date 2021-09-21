import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADING,
  USER_LOADED,
  REMOVE_INVITE,
  ACCEPT_INVITE,
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
    case REMOVE_INVITE:
      return {
        ...state,
        user: {
          ...state.user,
          friendInvites: state.user.friendInvites.filter(
            (friend: { _id: string }) => friend._id !== action.payload
          ),
        },
      };
    case ACCEPT_INVITE:
      return {
        ...state,
        user: {
          ...state.user,
          friendList: [action.payload.friend, ...state.user.friendList],
          friendInvites: state.user.friendInvites.filter(
            (friend: { _id: string }) =>
              friend._id !== action.payload.friend._id
          ),
        },
      };

    default:
      return state;
  }
}
