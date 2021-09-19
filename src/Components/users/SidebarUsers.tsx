import React, { FC } from "react";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

import styles from "../../styles/SideBarStyles";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducers";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
interface Props {
  classes: any;
}

const SidebarUsers: FC<Props> = ({ classes }) => {
  const user = useSelector((state: State) => state.auth.user);
  const viewedUser = useSelector((state: State) => state.users.singleUser);

  const history = useHistory();
  const handleLocation = (id: string) => {
    history.push(`/${id}`);
  };
  if (!user) return <div></div>;
  return (
    <div className={classes.root}>
      <Container className={classes.imgContainer} maxWidth="sm">
        <Typography variant="h5" color="primary">
          {viewedUser.fullName}
        </Typography>
        <img
          className={classes.profilePic}
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt=""
        />
        {!user.friendList.includes(viewedUser._id) ? (
          <Button variant="contained" color="primary">
            Send a friend requst
          </Button>
        ) : null}
      </Container>
      <Divider />
      <Container className={classes.friendList} maxWidth="sm">
        {!viewedUser.friendList
          ? null
          : viewedUser.friendList.map(
              (friend: { fullName: string; _id: string }) => (
                <div
                  onClick={handleLocation.bind(this, friend._id)}
                  key={friend._id}
                  className={classes.friendsImg}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    alt=""
                  />
                  <Typography>{friend.fullName}</Typography>
                </div>
              )
            )}
      </Container>
      <Divider />
      <div className={classes.viewFriends}>
        {!user.friendList.includes(viewedUser._id) ? null : (
          <Link to="/">View friends</Link>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(SidebarUsers);
