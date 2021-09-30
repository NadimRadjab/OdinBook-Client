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
  SEND_INVITE,
  REMOVE_FRIEND,
} from "../../actions/user/types";
import {
  ADD_SOCKET_MESSAGE,
  REMOVE_UNREAD_MESSAGES,
  REMOVE_UNREAD_SOCKET_MESSAGES,
} from "../../actions/chat/types";

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

interface UserLoading {
  type:
    | "USER_LOADING"
    | "LOGIN_FAIL"
    | "REGISTER_FAIL"
    | "AUTH_ERROR"
    | "LOGOUT_SUCCESS"
    | "SEND_INVITE";
}
interface UserLoaded {
  type: "USER_LOADED";
  payload: {};
}
interface LoginRegister {
  type: "LOGIN_SUCCESS" | "REGISTER_SUCCESS";
  payload: { user: {} };
}
interface RemoveInvite {
  type: "REMOVE_INVITE";
  payload: string;
}
interface AcceptInvite {
  type: "ACCEPT_INVITE";
  payload: { friend: { _id: string } };
}
interface RemoveUndreadMessages {
  type: "REMOVE_UNREAD_MESSAGES" | "REMOVE_UNREAD_SOCKET_MESSAGES";
  payload: "string";
}
interface AddSocketMessage {
  type: "ADD_SOCKET_MESSAGE";
  payload: {};
}
interface RemoveFriend {
  type: "REMOVE_FRIEND";
  payload: { friendId: string };
}

type Action =
  | UserLoading
  | LoginRegister
  | AddSocketMessage
  | RemoveUndreadMessages
  | AcceptInvite
  | RemoveInvite
  | UserLoaded
  | RemoveFriend;

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
    case REMOVE_FRIEND:
      return {
        ...state,
        user: {
          ...state.user,
          friendList: state.user.friendList.filter(
            (friend: { _id: string }) => friend._id !== action.payload.friendId
          ),
        },
      };
    case ADD_SOCKET_MESSAGE:
      return {
        ...state,
        user: {
          ...state.user,
          unreadMessages: [...state.user.unreadMessages, action.payload],
        },
      };
    case REMOVE_UNREAD_MESSAGES:
      return {
        ...state,
        user: {
          ...state.user,
          unreadMessages: state.user.unreadMessages.filter(
            (message: { _id: string }) => message._id !== action.payload
          ),
        },
      };
    case REMOVE_UNREAD_SOCKET_MESSAGES:
      return {
        ...state,
        user: {
          ...state.user,
          unreadMessages: state.user.unreadMessages.filter(
            (message: { _id: string }) => message._id !== action.payload
          ),
        },
      };

    default:
      return state;
  }
}
