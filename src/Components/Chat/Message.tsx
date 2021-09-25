import React from "react";
import styles from "../../styles/MessageStyles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { State } from "../../redux/reducers";

interface Props extends WithStyles<typeof styles> {
  message: {
    _id: string;
    sender: string;
    chatId: string;
    createdAt: Date;
    message: string;
    classes?: WithStyles;
  };
  currentUser: string;
}

const Message: React.FC<Props> = ({ message, classes, currentUser }) => {
  const user = useSelector((state: State) => state.mainUser.user);

  return (
    <ListItem className={classes.listItem}>
      {message.sender !== user._id ? (
        <ListItemAvatar className={classes.avatar}>
          <Avatar alt="Profile Picture" />
        </ListItemAvatar>
      ) : null}

      <ListItemText
        className={classes.message}
        primary={message.message}
        secondary={moment(message.createdAt).fromNow()}
      />
    </ListItem>
  );
};

export default withStyles(styles)(Message);
