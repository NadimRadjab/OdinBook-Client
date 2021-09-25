import React, { FC } from "react";
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
import { useDispatch } from "react-redux";
import { deleteComment } from "../../redux/actions/commentActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      flexDirection: "column",
      "& span": {
        alignSelf: "flex-end",
        marginBottom: "0.2rem",
      },
    },
    inline: {
      display: "inline",
    },
    items: {
      display: "flex",
      margin: "0.3rem",
      flexDirection: "column",
      "& p": {
        marginTop: "0.3rem",
      },
    },
    delete: {
      alignSelf: "flex-end",
      "&:hover": {
        cursor: "pointer",
      },
    },
  })
);

const Comment: FC<any> = ({ comment, postId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(true);

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id));
    setChecked(false);
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
            <div className={classes.items}>
              <Typography
                component="p"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {`${comment.author.firstName} ${comment.author.lastName}`}
              </Typography>
              <Typography variant="body2" color="textPrimary">
                {comment.text}
              </Typography>
            </div>
          }
        />
      </ListItem>

      <Typography component="span" variant="body2" color="textPrimary">
        {moment(comment.date).fromNow()}
      </Typography>
      <Divider variant="inset" />
    </List>
  );
};

export default Comment;
