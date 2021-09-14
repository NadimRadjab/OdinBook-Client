import { FC, useEffect, useState } from "react";
import { getPosts } from "../actions/postActions";
import { connect } from "react-redux";
import PostCard from "./posts/PostCard";
import Sidebar from "./navigation/Sidebar";
import styles from "../styles/HomeStyles";
import { withStyles } from "@material-ui/styles";
import PostForm from "./posts/PostForm";
interface Props {
  getPosts: Function;
  allPosts: any;
  friendsPosts: any;
  classes: any;
  loading: boolean;
}

const Home: FC<Props> = ({ getPosts, allPosts, classes, loading }) => {
  const [posts, setPosts] = useState([] as any);
  useEffect(() => {
    getPosts();
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
const mapStateToPorps = (state: any) => ({
  allPosts: state.posts.posts,
  loading: state.posts.isLoading,
});
export default connect(mapStateToPorps, { getPosts })(withStyles(styles)(Home));
