import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../reducers";
import { deletePost } from "../../actions/postActions";
import { useState } from "react";
import Comment from "./Comment";
import UpdatePost from "./UpdatePost";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 550,
      margin: "1.5rem",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
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
  const userState = useSelector((state: State) => state.auth.user);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };
  const handleUpdate = () => {
    setToggleUpdate(!toggleUpdate);
  };

  const fullName = `${post.author.firstName} ${post.author.lastName}`;
  const userFullName =
    userState === null ? null : `${userState.firstName} ${userState.lastName}`;
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <EditIcon onClick={handleUpdate} />
            <DeleteIcon onClick={handleDelete} />
          </IconButton>
        }
        title={fullName === "undefined undefined" ? userFullName : fullName}
        subheader={new Date(post.date).toUTCString().substr(0, 17)}
      />
      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
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
      <CardActions>
        <IconButton aria-label="Like">
          <ThumbUpAltIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Typography>Comment</Typography>
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {post.comments.map((c: any) => (
            <Comment key={c._id} comment={c} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
