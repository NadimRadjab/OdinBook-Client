import { FC, useEffect } from "react";
import { getPosts } from "../redux/actions/postActions";
import { getComments } from "../redux/actions/commentActions";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "./posts/PostCard";
import Sidebar from "./navigation/Sidebar";
import styles from "../styles/HomeStyles";
import { withStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import PostForm from "./posts/PostForm";
import { State } from "../redux/reducers";

interface Props {
  classes: any;
}

const Home: FC<Props> = ({ classes }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state: any) => state.posts.posts);
  const userLoading = useSelector((state: State) => state.auth.isLoading);

  useEffect(() => {
    dispatch(getPosts());
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
      <Sidebar />
      <div className={classes.card}>
        <div className={classes.form}>
          <PostForm />
        </div>

        {allPosts === undefined
          ? null
          : allPosts.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
      </div>
    </div>
  );
};

export default withStyles(styles)(Home);
