import {
  GET_POSTS,
  DELETE_POST,
  UPDATE_POST,
  ADD_POST,
  POSTS_LOADING,
  LIKE_POST,
  UNLIKE_POST,
  ADD_POST_IMAGE,
  POSTS_LOADED,
} from "../actions/posts/types";

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

interface GetPosts {
  type: "GET_POSTS";
  payload: {}[];
}
interface AddPost {
  type: "ADD_POST" | "ADD_POST_IMAGE";
  payload: {};
}
interface UpdatePost {
  type: "UPDATE_POST";
  payload: {
    id: string;
    text: string;
  };
}
interface DeletePost {
  type: "DELETE_POST";
  payload: string;
}
interface PostsLoading {
  type: "POSTS_LOADING" | "POSTS_LOADED";
}
interface LikePost {
  type: "LIKE_POST";
  payload: {
    id: string;
    like: string;
  };
}
interface UnlikePost {
  type: "UNLIKE_POST";
  payload: {
    id: string;
    likeId: string;
  };
}
type Action =
  | GetPosts
  | AddPost
  | DeletePost
  | UpdatePost
  | PostsLoading
  | LikePost
  | UnlikePost;

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    case ADD_POST:
    case ADD_POST_IMAGE:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        isLoading: false,
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, text: action.payload.text }
            : post
        ),
        isLoading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        isLoading: false,
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
        isLoading: false,
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
        isLoading: false,
      };

    case POSTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case POSTS_LOADED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
