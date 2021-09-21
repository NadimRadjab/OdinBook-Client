import React, { FC } from "react";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import styles from "../../styles/SideBarStyles";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/reducers";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {
  sendFriendInvite,
  cancelFriendInvite,
} from "../../redux/actions/mainUser/mainUserActions";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Friend {
  fullName: string;
  _id: string;
  image: { url: string }[];
}

const SidebarUsers: FC<any> = ({ classes }) => {
  const user = useSelector((state: State) => state.mainUser.user);
  const viewedUser = useSelector((state: State) => state.users.singleUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLocation = (id: string) => {
    history.push(`/${id}`);
  };

  const checkFriendList = () => {
    if (!user) return;
    return user.friendList.some((friend: Friend) => {
      return viewedUser._id === friend._id;
    });
  };

  const checkFriendInvites = () => {
    if (!viewedUser) return;
    return viewedUser.friendInvites.some((friend: Friend) => {
      return friend._id === user._id;
    });
  };

  const handleInvite = () => {
    dispatch(sendFriendInvite(viewedUser._id));
  };
  const handleRemoveInvite = () => {
    dispatch(cancelFriendInvite(viewedUser._id));
  };
  const handleRequestButtons = (): JSX.Element => {
    if (!checkFriendInvites()) {
      return (
        <Button onClick={handleInvite} variant="contained" color="primary">
          Send a friend requst
        </Button>
      );
    } else {
      return (
        <Button
          onClick={handleRemoveInvite}
          variant="contained"
          color="default"
        >
          Cancel friend request
        </Button>
      );
    }
  };

  if (!viewedUser)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  return (
    <div className={classes.root}>
      <Container className={classes.imgContainer} maxWidth="sm">
        <Typography variant="h5" color="primary">
          {viewedUser.fullName}
        </Typography>
        <img
          className={classes.profilePic}
          src={!viewedUser.image ? "" : viewedUser.image[0].url}
          alt="profile-pic"
        />
        {!checkFriendList() ? handleRequestButtons() : null}
      </Container>
      <Divider />
      <Container className={classes.friendList} maxWidth="sm">
        {!viewedUser.friendList
          ? null
          : viewedUser.friendList.map((friend: Friend) => (
              <div
                onClick={handleLocation.bind(this, friend._id)}
                key={friend._id}
                className={classes.friendsImg}
              >
                <img
                  src={!friend.image ? "" : friend.image[0].url}
                  alt="friend-list-profile-image"
                />
                <Typography>{friend.fullName}</Typography>
              </div>
            ))}
      </Container>
      <Divider />
      <div className={classes.viewFriends}>
        {!checkFriendList() ? null : <Link to="/">View friends</Link>}
      </div>
    </div>
  );
};

export default withStyles(styles)(SidebarUsers);
