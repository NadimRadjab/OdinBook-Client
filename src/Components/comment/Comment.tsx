import React, { FC, useEffect } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/actions/commentActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
    },
    inline: {
      display: "inline",
    },
    delete: {
      alignSelf: "flex-end",
      // position: "absolute",
      // margin: "1rem",
      // right: 0,
    },
  })
);

const Comment: FC<any> = ({ comment, postId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id));
  };
  return (
    <List className={classes.root}>
      <DeleteIcon onClick={handleDelete} className={classes.delete} />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>

        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {`${comment.author.firstName} ${comment.author.lastName}`}
              </Typography>
              {` — ${comment.text}`}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <Typography component="span" variant="body2" color="textPrimary">
        {moment(comment.date).fromNow()}
      </Typography>
    </List>
  );
};

export default Comment;
