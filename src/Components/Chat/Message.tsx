import React, { useEffect } from "react";
import styles from "../../styles/MessageStyles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { State } from "../../redux/reducers";
import {
  removeUnreadMessages,
  removeUnreadSocketMessages,
} from "../../redux/actions/chat/chatActions";

interface Props extends WithStyles<typeof styles> {
  message: {
    _id: string;
    sender: string;
    chatId: string;
    createdAt: Date;
    message: string;
    classes?: WithStyles;
  };
  userIcon: string;
  currentUser: string;
}

const Message: React.FC<Props> = ({
  userIcon,
  message,
  classes,
  currentUser,
}) => {
  const user = useSelector((state: State) => state.mainUser.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!message) return;
    for (let m of user.unreadMessages) {
      if (message._id === m._id) {
        const newObj = {
          messages: m._id,
        };
        if (!newObj.messages.includes("-")) {
          dispatch(removeUnreadMessages(message.chatId, newObj));
        } else {
          dispatch(removeUnreadSocketMessages(newObj));
        }
      }
    }
  }, [message]);

  return (
    <ListItem className={classes.listItem}>
      {message.sender !== user._id ? (
        <ListItemAvatar className={classes.avatar}>
          <Avatar src={userIcon} alt="Profile Picture" />
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
