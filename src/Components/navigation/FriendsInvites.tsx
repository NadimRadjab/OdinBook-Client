import React, { FC } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PeopleIcon from "@material-ui/icons/People";

import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { Box, Container } from "@material-ui/core";
import styles from "../../styles/FriendsInvitesStyles";
interface Props {
  classes: any;
}

const FriendsInvites: FC<Props> = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
          <PeopleIcon />
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
          <Box className={classes.friendList}>
            <p>Some Name send you a friend request.</p>
            <img
              className={classes.profilePic}
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              alt=""
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
            </div>
          </Box>
          <Box className={classes.friendList}>
            <p>Some Name send you a friend request.</p>
            <img
              className={classes.profilePic}
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              alt=""
            />
            <div className={classes.buttons}>
              <Button size="small" color="primary" variant="outlined">
                Accept
              </Button>
              <Button size="small" color="secondary" variant="outlined">
                Decline
              </Button>
            </div>
          </Box>
          <Box className={classes.friendList}>
            <p>Some Name send you a friend request.</p>
            <img
              className={classes.profilePic}
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              alt=""
            />
            <div className={classes.buttons}>
              <Button size="small" color="primary" variant="outlined">
                Accept
              </Button>
              <Button size="small" color="secondary" variant="outlined">
                Decline
              </Button>
            </div>
          </Box>
          <Box className={classes.friendList}>
            <p>Some Name send you a friend request.</p>
            <img
              className={classes.profilePic}
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              alt=""
            />
            <div className={classes.buttons}>
              <Button size="small" color="primary" variant="outlined">
                Accept
              </Button>
              <Button size="small" color="secondary" variant="outlined">
                Decline
              </Button>
            </div>
          </Box>
          <Box className={classes.friendList}>
            <p>Some Name send you a friend request.</p>
            <img
              className={classes.profilePic}
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              alt=""
            />
            <div className={classes.buttons}>
              <Button size="small" color="primary" variant="outlined">
                Accept
              </Button>
              <Button size="small" color="secondary" variant="outlined">
                Decline
              </Button>
            </div>
          </Box>
          <Box className={classes.friendList}>
            <p>Some Name send you a friend request.</p>
            <img
              className={classes.profilePic}
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              alt=""
            />
            <div className={classes.buttons}>
              <Button size="small" color="primary" variant="outlined">
                Accept
              </Button>
              <Button size="small" color="secondary" variant="outlined">
                Decline
              </Button>
            </div>
          </Box>
        </Container>
      </Menu>
    </div>
  );
};

export default withStyles(styles)(FriendsInvites);
