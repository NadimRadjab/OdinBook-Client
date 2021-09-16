import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  msg: {},
  status: null,
  id: null,
};
interface GetAction {
  type: "GET_ERRORS";
  payload: {
    msg: string;
    status: null | number;
    id: null | string;
  };
}
interface ClearActions {
  type: "CLEAR_ERRORS";
}
type Action = GetAction | ClearActions;

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}