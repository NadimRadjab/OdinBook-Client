import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Divider } from "@material-ui/core";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducers";
import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";

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
}
const ChatList: React.FC = () => {
  const classes = useStyles();
  const user = useSelector((state: State) => state.mainUser.user);
  const isLoading = useSelector((state: State) => state.mainUser.isLoading);
  const history = useHistory();
  const viewProfile = (id: string) => {
    if (id === user._id) return history.push(`/`);
    history.push(`/${id}`);
  };
  const renderProfiles = () => {
    if (!user) return;
    return user.friendList.map((friend: Friend) => (
      <div className={classes.items} key={friend._id}>
        <ListItem button>
          <ListItemAvatar>
            <Avatar alt={"Avatar"} src={friend.image[0].url} />
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
