import { FC, useEffect } from "react";
import { getPosts } from "../actions/postActions";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "./posts/PostCard";
import Sidebar from "./navigation/Sidebar";
import styles from "../styles/HomeStyles";
import { withStyles } from "@material-ui/styles";
import PostForm from "./posts/PostForm";

interface Props {
  classes: any;
}

const Home: FC<Props> = ({ classes }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state: any) => state.posts.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [getPosts]);
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
