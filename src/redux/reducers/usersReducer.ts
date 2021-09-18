import {
  LOAD_USERS,
  GET_USERS,
  GET_USER,
  LIKE_USER_POST,
  MAKE_OBJECT,
  UNLIKE_USER_POST,
} from "../actions/types";

interface UsersState {
  searchedUsers: {};
  singleUser: any;
  isLoading: boolean;
}

const initialState: UsersState = {
  searchedUsers: [],
  singleUser: [],

  isLoading: false,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USERS:
      return {
        ...state,
        searchedUsers: action.payload,
        isLoading: false,
      };
    case GET_USER:
      return {
        ...state,
        singleUser: [action.payload],
        isLoading: false,
      };
    case LIKE_USER_POST:
      return {
        ...state,
        singleUser: state.singleUser[0].posts.map((post: any) => {
          if (post._id === action.payload.id) {
            let newArr = [];
            newArr.push(...post.likes);
            newArr.push(action.payload.like);

            post.likes = newArr;
            return state.singleUser[0];
          } else return post;
        }),
      };
    case UNLIKE_USER_POST:
      return {
        ...state,
        singleUser: state.singleUser[0].posts.map((post: any) => {
          if (post._id === action.payload.id) {
            let newArr = [];
            newArr.push(...post.likes);
            const filterLike = newArr.filter(
              (like) => like._id !== action.payload.likeId
            );
            post.likes = filterLike;
            return state.singleUser[0];
          } else return post;
        }),
      };
    case MAKE_OBJECT:
      return {
        ...state,
        singleUser: state.singleUser,
      };

    default:
      return state;
  }
}
