import {
  LOAD_USERS,
  GET_USERS,
  GET_USER,
  LIKE_USER_POST,
  UNLIKE_USER_POST,
  GET_USER_POSTS,
  LOAD_USER_POSTS,
} from "../actions/types";

type Post = {
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
  };
}[];

interface UsersState {
  searchedUsers: {};
  singleUser: {}[];
  posts: Post;
  isUserLoading: boolean;
  isPostsLoading: boolean;
}

const initialState: UsersState = {
  searchedUsers: [],
  singleUser: [],
  posts: [],
  isUserLoading: false,
  isPostsLoading: false,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        isUserLoading: true,
      };
    case LOAD_USER_POSTS:
      return {
        ...state,
        isPostsLoading: true,
      };
    case GET_USERS:
      return {
        ...state,
        searchedUsers: action.payload,
        isUserLoading: false,
      };
    case GET_USER:
      return {
        ...state,
        singleUser: action.payload,
        isUserLoading: false,
      };
    case GET_USER_POSTS:
      return {
        ...state,
        posts: action.payload,
        isPostsLoading: false,
      };
    case LIKE_USER_POST:
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
    case UNLIKE_USER_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload.id) {
            let newArr = [];
            newArr.push(...post.likes);
            const filterLike = newArr.filter(
              (like) => like._id !== action.payload.likeId
            );
            post.likes = filterLike;
            return { ...post, likes: filterLike };
          } else return post;
        }),
      };

    default:
      return state;
  }
}
