import {
  GET_POSTS,
  DELETE_POST,
  UPDATE_POST,
  ADD_POST,
  POSTS_LOADING,
} from "../actions/types";

const initialState = {
  posts: [],
  isLoading: false,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        post: action.payload,
        isLoading: false,
      };
    case POSTS_LOADING:
      return {
        isLoading: true,
      };
    default:
      return state;
  }
}
