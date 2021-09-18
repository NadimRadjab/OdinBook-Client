import {
  GET_POSTS,
  DELETE_POST,
  UPDATE_POST,
  ADD_POST,
  POSTS_LOADING,
  LIKE_POST,
  UNLIKE_POST,
} from "../actions/types";

interface PostState {
  posts: {
    _id: string;
    text: string;
    author: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    likes: {
      _id: string;
      author: string;
      post: string;
    }[];

    comments: {
      _id: string;
      text: string;
      author: string;
    }[];
  }[];
  isLoading: boolean;
}

const initialState: PostState = {
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
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, text: action.payload.text }
            : post
        ),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload.id) {
            let newArr = [];
            newArr.push(...post.likes);
            newArr.push(action.payload.like);
            return { ...post, likes: newArr };
          } else return post;
        }),
      };
    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload.id) {
            let newArr = [];
            newArr.push(...post.likes);
            const filterLike = newArr.filter(
              (like) => like._id !== action.payload.likeId
            );
            return { ...post, likes: filterLike };
          } else return post;
        }),
      };

    case POSTS_LOADING:
      return {
        isLoading: true,
      };
    default:
      return state;
  }
}
