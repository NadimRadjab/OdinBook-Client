import { FC, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { getPosts } from "../redux/actions/posts/postActions";
import { getComments } from "../redux/actions/commentActions";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "./posts/PostCard";
import Sidebar from "./main-user/Sidebar";
import CircularProgress from "@material-ui/core/CircularProgress";
import PostForm from "./posts/PostForm";
import { State } from "../redux/reducers";
import styles from "../styles/HomeStyles";

interface Props {
  classes: any;
}

const Home: FC<Props> = ({ classes }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state: any) => state.posts.posts);
  const userLoading = useSelector((state: State) => state.auth.isLoading);
  const isPostsLoading = useSelector((state: any) => state.posts.isLoading);

  useEffect(() => {
    dispatch(getPosts());
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
      <Sidebar />
      <div className={classes.card}>
        <div className={classes.form}>
          <PostForm />
        </div>
        {isPostsLoading ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          allPosts.map((post: any) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(Home);
