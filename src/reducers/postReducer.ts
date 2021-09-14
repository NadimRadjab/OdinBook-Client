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
        posts: action.payload,
        isLoading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        // posts: state.posts.filter((post)=>post._id!==action.payload)
      };

    case POSTS_LOADING:
      return {
        isLoading: true,
      };
    default:
      return state;
  }
}
