import React, { FC } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PeopleIcon from "@material-ui/icons/People";

import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { Box, Container, Divider, Badge } from "@material-ui/core";
import styles from "../../styles/FriendsInvitesStyles";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducers";
interface Props {
  classes: any;
}

const FriendsInvites: FC<Props> = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const user = useSelector((state: State) => state.auth.user);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const friendInvites = () => {
    if (!user) return;
    return user.friendInvites.map((invite: any) => (
      <Box className={classes.friendList}>
        <p>{invite.fullName} send you a friend request.</p>
        <img
          className={classes.profilePic}
          src={invite.image[0].url}
          alt="sender-image"
        />
        <div className={classes.buttons}>
          <Button size="small" color="primary" variant="outlined">
            Accept
          </Button>
          <Button
            onClick={handleClose}
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
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}
        >
          <Badge badgeContent={user.friendInvites.length} color="secondary">
            <PeopleIcon />
          </Badge>
        </ListItem>
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
