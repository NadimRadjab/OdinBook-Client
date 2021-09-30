import { FC, useEffect } from "react";
import { getUser, getUserPosts } from "../../redux/actions/usersActions";
import { useSelector, useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import PostCard from "../posts/PostCard";
import SidebarUsers from "./SidebarUsers";
import { getComments } from "../../redux/actions/commentActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { State } from "../../redux/reducers";
import { useLocation } from "react-router-dom";
import styles from "../../styles/HomeStyles";

interface Props {
  classes: any;
}

const ViewUser: FC<Props> = ({ classes }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: State) => state.users.posts);
  const userLoading = useSelector((state: State) => state.users.isUserLoading);
  const postsLoading = useSelector(
    (state: State) => state.users.isPostsLoading
  );
  const location = useLocation();
  useEffect(() => {
    dispatch(getUser(location.pathname));
    dispatch(getUserPosts(location.pathname));
  }, [dispatch, location]);

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  if (userLoading)
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );

  return (
    <div className={classes.root}>
      <SidebarUsers />
      <div className={classes.card}>
        {postsLoading ? (
          <div className="loading">
            <CircularProgress />
          </div>
        ) : (
          posts.map((post: any) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(ViewUser);
