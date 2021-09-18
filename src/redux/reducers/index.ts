import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";
import usersReducer from "./usersReducer";
const reducers = combineReducers({
  auth: authReducer,
  error: errorReducer,
  posts: postReducer,
  comments: commentReducer,
  users: usersReducer,
});
export default reducers;

export type State = ReturnType<typeof reducers>;
