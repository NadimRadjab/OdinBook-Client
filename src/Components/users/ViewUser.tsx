import { FC, useEffect } from "react";
import { getUser } from "../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../posts/PostCard";
import SidebarUsers from "./SidebarUsers";
import styles from "../../styles/HomeStyles";
import { withStyles } from "@material-ui/styles";
import { getComments } from "../../redux/actions/commentActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import PostForm from "../posts/PostForm";
import { State } from "../../redux/reducers";
import { useLocation } from "react-router-dom";

interface Props {
  classes: any;
}

const ViewUser: FC<Props> = ({ classes }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.users.singleUser);
  const userLoading = useSelector((state: State) => state.users.isLoading);
  const location = useLocation();
  useEffect(() => {
    dispatch(getUser(location.pathname));
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

  const users = user.filter((users: any) => users.firstName);

  const posts = users.map((user: any) => user.posts);

  return (
    <div className={classes.root}>
      <SidebarUsers />
      <div className={classes.card}>
        <div className={classes.form}>
          <PostForm />
        </div>

        {posts[0] === undefined
          ? null
          : posts[0].map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
      </div>
    </div>
  );
};
{
}
export default withStyles(styles)(ViewUser);
