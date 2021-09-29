import {
  GET_CHAT,
  CHAT_LOADING,
  GET_MESSAGES,
  CLOSE_CHAT,
  SEND_MESSAGE,
  ADD_SOCKET_MESSAGE,
} from "../../actions/chat/types";
interface ChatState {
  chat: {
    _id: string;
  }[];
  messages: {
    chatId: string;
  }[];

  isLoading: boolean;
}
const initialState: ChatState = {
  chat: [],
  messages: [],
  isLoading: false,
};

interface GetChat {
  type: "GET_CHAT" | "SEND_MESSAGE" | "GET_MESSAGES" | "ADD_SOCKET_MESSAGE";
  payload: {}[];
}

interface CloseChat {
  type: "CLOSE_CHAT";
  payload: string;
}
interface ChatLoading {
  type: "CHAT_LOADING";
}
type Action = GetChat | CloseChat | ChatLoading;

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case GET_CHAT:
      return {
        ...state,
        chat: [...state.chat, ...action.payload],
        isLoading: false,
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: [...action.payload, ...state.messages].reverse(),
      };

    case SEND_MESSAGE:
    case ADD_SOCKET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case CLOSE_CHAT:
      return {
        ...state,
        chat: state.chat.filter(
          (c: { _id: string }) => c._id !== action.payload
        ),
        messages: state.messages.filter(
          (message: { chatId: string }) => message.chatId !== action.payload
        ),
      };
    case CHAT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
