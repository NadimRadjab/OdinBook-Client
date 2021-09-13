import React, { FC, useEffect, useState } from "react";
import { getPosts } from "../actions/postActions";
import { connect } from "react-redux";
import PostCard from "./posts/PostCard";
import Sidebar from "./navigation/Sidebar";
import styles from "../styles/HomeStyles";
import { withStyles } from "@material-ui/styles";
interface Props {
  getPosts: Function;
  allPosts: any;
  friendsPosts: any;
  classes: any;
}

const Home: FC<Props> = ({ getPosts, allPosts, classes }) => {
  const [posts, setPosts] = useState([] as any);
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className={classes.root}>
      <Sidebar />
      <PostCard />
    </div>
  );
};
const mapStateToPorps = (state: any) => ({
  allPosts: state.posts.post,
});
export default connect(mapStateToPorps, { getPosts })(withStyles(styles)(Home));
