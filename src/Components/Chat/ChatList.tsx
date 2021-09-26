import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Badge, Divider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../redux/reducers";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getChat } from "../../redux/actions/chat/chatActions";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: "1.5rem",
      backgroundColor: theme.palette.background.paper,
      "& li": {
        margin: "1rem",
      },
    },
    items: {
      width: "100%",
    },
    loading: {
      width: "100%",
      height: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

interface Friend {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  image: {
    url: string;
  }[];
  chats: [];
}
interface Props {
  handleDrawerClose: () => void;
}
const ChatList: React.FC<Props> = ({ handleDrawerClose }) => {
  const classes = useStyles();
  const user = useSelector((state: State) => state.mainUser.user);
  const isLoading = useSelector((state: State) => state.mainUser.isLoading);
  const chats = useSelector((state: State) => state.conversation.chat);

  const dispatch = useDispatch();
  const isUserInChat = (userId: string) => {
    for (let c of chats) {
      return c.participants.some((p: { _id: string }) => p._id === userId);
    }
  };
  const handleMessageNotifications = (userId: string) => {
    let number = 0;
    if (!user) return;
    for (let m of user.unreadMessages) {
      if (m.sender === userId) {
        number++;
      }
    }
    return number;
  };
  const handleClick = (userId: string): void => {
    if (chats.length === 3 || isUserInChat(userId)) return;

    dispatch(getChat(userId));
    handleDrawerClose();
  };
  handleMessageNotifications("614aefafc5df82d0d9fda1d1");
  const renderProfiles = () => {
    if (!user) return;
    return user.friendList.map((friend: Friend) => (
      <div className={classes.items} key={friend._id}>
        <ListItem onClick={handleClick.bind(this, friend._id)} button>
          <ListItemAvatar>
            <Badge
              color="secondary"
              badgeContent={handleMessageNotifications(friend._id)}
            >
              <Avatar alt={"Avatar"} src={friend.image[0].url} />
            </Badge>
          </ListItemAvatar>
          <ListItemText id={friend._id} primary={`${friend.fullName} `} />
          <ListItemSecondaryAction></ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </div>
    ));
  };

  if (isLoading)
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  return <List className={classes.root}>{renderProfiles()}</List>;
};
export default ChatList;
