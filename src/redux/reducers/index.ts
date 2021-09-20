import { combineReducers } from "redux";
import authReducer from "./user/authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import usersReducer from "./usersReducer";
import mainUser from "./user/mainReducer";
const reducers = combineReducers({
  auth: authReducer,
  mainUser: mainUser,
  error: errorReducer,
  posts: postReducer,
  comments: commentReducer,
  users: usersReducer,
});
export default reducers;

export type State = ReturnType<typeof reducers>;
