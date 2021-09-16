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
  comments: [] as any,
  isLoading: false,
};

export default function (state = initialState, action: any) {
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
