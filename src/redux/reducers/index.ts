import { combineReducers, Reducer } from "redux";
import authReducer from "./user/authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import usersReducer from "./usersReducer";
import mainUser from "./user/userReducer";
import chatReducer from "./chat/chatReducer";

const reducers: Reducer = combineReducers({
  auth: authReducer,
  mainUser: mainUser,
  error: errorReducer,
  posts: postReducer,
  comments: commentReducer,
  users: usersReducer,
  conversation: chatReducer,
});
export default reducers;

export type State = ReturnType<typeof reducers>;
