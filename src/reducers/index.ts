import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
const reducers = combineReducers({
  auth: authReducer,
  error: errorReducer,
  posts: postReducer,
});
export default reducers;

export type State = ReturnType<typeof reducers>;
