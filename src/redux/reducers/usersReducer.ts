import {
  LOAD_USERS,
  GET_USERS,
  GET_USER,
  LIKE_USER_POST,
  UNLIKE_USER_POST,
  GET_USER_POSTS,
  LOAD_USER_POSTS,
} from "../actions/types";
import {
  SEND_INVITE,
  CANCEL_FRIEND_REQUEST,
  ACCEPT_INVITE,
  REMOVE_FRIEND,
} from "../actions/user/types";

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
  viewdUser: any;
  posts: Post;

  isUserLoading: boolean;
  isPostsLoading: boolean;
}

const initialState: UsersState = {
  searchedUsers: [],
  viewdUser: null,
  posts: [],
  isUserLoading: false,
  isPostsLoading: false,
};
interface GetUsers {
  type: "GET_USERS" | "GET_USER";
  payload: {}[];
}
interface GetUserPosts {
  type: "GET_USER_POSTS";
  payload: {}[];
}
interface SendInvite {
  type: "SEND_INVITE";
  payload: {};
}
interface CancelFriendRequest {
  type: "CANCEL_FRIEND_REQUEST";
  payload: string;
}
interface LoadUsesrs {
  type: "LOAD_USERS" | "LOAD_USER_POSTS";
}
interface LikePost {
  type: "LIKE_USER_POST";
  payload: {
    id: string;
    like: string;
  };
}
interface UnlikePost {
  type: "UNLIKE_USER_POST";
  payload: {
    id: string;
    likeId: string;
  };
}
interface AcceptInvite {
  type: "ACCEPT_INVITE";
  payload: { user: {} };
}
interface RemoveFriend {
  type: "REMOVE_FRIEND";
  payload: { id: string };
}
type Action =
  | GetUsers
  | GetUserPosts
  | CancelFriendRequest
  | SendInvite
  | LoadUsesrs
  | LikePost
  | AcceptInvite
  | RemoveFriend
  | UnlikePost;

export default function (state = initialState, action: Action) {
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
        viewdUser: action.payload,
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
        isPostsLoading: false,
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
        isPostsLoading: false,
      };
    case SEND_INVITE:
      return {
        ...state,
        viewdUser: {
          ...state.viewdUser,
          friendInvites: [action.payload, ...state.viewdUser.friendInvites],
        },
      };
    case CANCEL_FRIEND_REQUEST:
      return {
        ...state,
        viewdUser: {
          ...state.viewdUser,
          friendInvites: state.viewdUser.friendInvites.filter(
            (friend: { _id: string }) => friend._id === action.payload
          ),
        },
      };
    case ACCEPT_INVITE:
      if (!state.viewdUser) {
        return {
          ...state,
        };
      } else
        return {
          ...state,
          viewdUser: {
            ...state.viewdUser,
            friendList: [action.payload.user, ...state.viewdUser.friendList],
          },
        };

    case REMOVE_FRIEND:
      return {
        ...state,
        viewdUser: {
          ...state.viewdUser,
          friendList: state.viewdUser.friendList.filter(
            (friend: { _id: string }) => friend._id !== action.payload.id
          ),
        },
      };

    default:
      return state;
  }
}
