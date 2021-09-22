import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePost,
  likePost,
  unlikePost,
} from "../../redux/actions/postActions";
import { useState } from "react";
import UpdatePost from "./UpdatePost";
import AddComment from "../comments/AddComment";
import Comment from "../comments/Comment";
import { State } from "../../redux/reducers";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 550,
      margin: "1.5rem",
    },
    media: {
      height: "500px",
    },
    like: {
      display: "flex",
      justifyContent: "space-evenly",
    },
    expand: {
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },

    avatar: {
      backgroundColor: red[500],
    },
  })
);
const PostCard: FC<any> = ({ post }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const dispatch = useDispatch();
  const isCommentsLoading = useSelector(
    (state: any) => state.comments.isLoading
  );

  const allComments = useSelector((state: any) => state.comments.comments);
  const user = useSelector((state: State) => state.mainUser.user);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };
  const handleLike = () => {
    dispatch(likePost(post._id));
  };
  const handleUnlike = () => {
    dispatch(unlikePost(post._id));
  };
  const handleUpdate = () => {
    setToggleUpdate(!toggleUpdate);
  };
  const isAuthor = post.author._id === user._id;

  const fullName = `${post.author.firstName} ${post.author.lastName}`;
  const isLiked = post.likes.some(
    (like: { author: string }) => like.author === user._id
  );

  const likesCount = post.likes.length;
  let likes;
  if (!likesCount) {
    <div></div>;
  } else if (likesCount === 1) {
    likes = `${likesCount} like`;
  } else {
    likes = `${likesCount} likes`;
  }

  if (isCommentsLoading) return <CircularProgress />;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            src={!post.author.image ? "" : post.author.image[0].url}
            aria-label="recipe"
            className={classes.avatar}
          />
        }
        action={
          !isAuthor ? null : (
            <div>
              <IconButton>
                <EditIcon onClick={handleUpdate} />
              </IconButton>
              <IconButton aria-label="settings">
                <DeleteIcon onClick={handleDelete} />
              </IconButton>
            </div>
          )
        }
        title={fullName}
        subheader={new Date(post.date).toUTCString().substr(0, 17)}
      />
      {!post.image.length ? null : (
        <CardMedia
          className={classes.media}
          image={post.image[0].url}
          title="post-image"
        />
      )}

      <CardContent>
        {!toggleUpdate ? (
          <Typography variant="body1" component="p">
            {post.text}
          </Typography>
        ) : (
          <UpdatePost
            handleUpdate={handleUpdate}
            id={post._id}
            text={post.text}
          />
        )}
      </CardContent>
      <CardActions className={classes.like}>
        <IconButton aria-label="Like">
          {isLiked ? (
            <ThumbUpAltIcon color="primary" onClick={handleUnlike} />
          ) : (
            <ThumbUpAltOutlinedIcon onClick={handleLike} />
          )}
        </IconButton>
        {likes}
        <IconButton
          className={clsx(classes.expand, {
            expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Badge badgeContent={post.comments.length} color="primary">
            <QuestionAnswerIcon />
          </Badge>
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <AddComment id={post._id} />
        <Divider />
        <CardContent>
          {allComments
            .filter((comment: any) => comment.post === post._id)
            .map((c: any) => (
              <Comment key={c._id} comment={c} postId={post._id} />
            ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default PostCard;
