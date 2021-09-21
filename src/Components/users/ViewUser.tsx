import { FC, useEffect } from "react";
import { getUser, getUserPosts } from "../../redux/actions/usersActions";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../posts/PostCard";
import SidebarUsers from "./SidebarUsers";
import styles from "../../styles/HomeStyles";
import { withStyles } from "@material-ui/styles";
import { getComments } from "../../redux/actions/commentActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { State } from "../../redux/reducers";
import { useLocation } from "react-router-dom";

interface Props {
  classes: any;
}

const ViewUser: FC<Props> = ({ classes }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.users.posts);
  const userLoading = useSelector((state: State) => state.users.isUserLoading);
  const location = useLocation();
  useEffect(() => {
    dispatch(getUser(location.pathname));
    dispatch(getUserPosts(location.pathname));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  if (userLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <div className={classes.root}>
      <SidebarUsers />
      <div className={classes.card}>
        <div className={classes.form}></div>
        {posts === undefined
          ? null
          : posts.map((post: any) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
};
{
}
export default withStyles(styles)(ViewUser);
