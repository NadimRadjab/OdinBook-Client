import {
  GET_COMMENTS,
  COMMENTS_LOADING,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../actions/types";
interface CommentsState {
  comments: {
    text: string;
    _id: string;
    author: { _id: string; firstName: string; lastName: string };
    post: string;
  }[];
  isLoading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
};

interface GetComments {
  type: "GET_COMMENTS";
  payload: {}[];
}
interface AddComment {
  type: "ADD_COMMENT";
  payload: {};
}
interface DeleteComment {
  type: "DELETE_COMMENT";
  payload: string;
}
interface CommentsLoading {
  type: "COMMENTS_LOADING";
}
type Action = GetComments | AddComment | DeleteComment | CommentsLoading;

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        isLoading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };

    case COMMENTS_LOADING:
      return {
        isLoading: true,
      };
    default:
      return state;
  }
}
