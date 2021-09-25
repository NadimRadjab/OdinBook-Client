import {
  GET_CHAT,
  CHAT_LOADING,
  GET_MESSAGES,
  CLOSE_CHAT,
  SEND_MESSAGE,
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

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_CHAT:
      return {
        ...state,
        chat: [...action.payload, ...state.chat],
        isLoading: false,
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    case SEND_MESSAGE:
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
