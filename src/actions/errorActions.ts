import { GET_ERRORS, CLEAR_ERRORS } from "./types";

interface Message {
  message: string;
}
export const returnErros = (
  msg: Message,
  status: number | null,
  id = null || ""
) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};
export const clearErros = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
