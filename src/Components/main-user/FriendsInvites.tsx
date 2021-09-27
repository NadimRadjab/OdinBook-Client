import React, { FC } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PeopleIcon from "@material-ui/icons/People";

import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { Box, Container, Divider, Badge } from "@material-ui/core";
import styles from "../../styles/FriendsInvitesStyles";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../redux/reducers";
import {
  removeFriendInvite,
  acceptFriendInvite,
} from "../../redux/actions/user/userActions";

interface Props {
  classes: any;
}

const FriendsInvites: FC<Props> = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.mainUser.user);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id: string) => {
    setAnchorEl(null);
    dispatch(removeFriendInvite(id));
  };
  const handleAccept = (id: string) => {
    dispatch(acceptFriendInvite(id));
  };

  const friendInvites = () => {
    if (!user) return;
    return user.friendInvites.map((invite: any) => (
      <Box className={classes.friendList}>
        <p>{invite.fullName} send you a friend request.</p>
        <img
          className={classes.profilePic}
          src={invite.image[0].url}
          alt="sender"
        />
        <div className={classes.buttons}>
          <Button
            onClick={handleAccept.bind(this, invite._id)}
            size="small"
            color="primary"
            variant="outlined"
          >
            Accept
          </Button>
          <Button
            onClick={handleClose.bind(this, invite._id)}
            size="small"
            color="secondary"
            variant="outlined"
          >
            Decline
          </Button>
          <Divider />
        </div>
      </Box>
    ));
  };
  if (!user) return <div></div>;
  return (
    <div>
      <List
        onClick={handleClickListItem}
        component="nav"
        aria-label="Device settings"
      >
        <Badge badgeContent={user.friendInvites.length} color="secondary">
          <PeopleIcon />
        </Badge>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Container className={classes.friendListContainer}>
          {friendInvites()}
        </Container>
      </Menu>
    </div>
  );
};

export default withStyles(styles)(FriendsInvites);
