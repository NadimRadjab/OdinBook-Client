import React, { FC } from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import FriendsInvites from "../main-user/FriendsInvites";
import { logout } from "../../redux/actions/user/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getUsers } from "../../redux/actions/usersActions";
import { State } from "../../redux/reducers";
import styles from "../../styles/navigation/NavbarItemsStyles";
import ProfileMenu from "./ProfileMenu";

interface Props extends WithStyles<typeof styles> {
  openDrawer: () => void;
  classes: any;
}

const NavbarItems: FC<Props> = ({ openDrawer, classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = React.useState("");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const user = useSelector((state: State) => state.mainUser.user);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/s?name=${name}`);
    dispatch(getUsers(name));
  };
  const handleProfileMenuOpen = (event: React.ChangeEvent<any>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.ChangeEvent<any>): void => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };
  const handleHome = () => {
    history.push("/");
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={openDrawer}>
        <Badge
          badgeContent={!user ? 0 : user.unreadMessages.length}
          color="secondary"
        >
          <ChatIcon />
        </Badge>

        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <FriendsInvites />
        <p>Invites</p>
      </MenuItem>
      <MenuItem
        className={classes.profileMobile}
        onClick={handleProfileMenuOpen}
      >
        <ProfileMenu handleLogout={handleLogout} />
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            onClick={handleHome}
            className={classes.title}
            variant="h6"
            noWrap
          >
            Odin Book
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={handleSubmit}>
              <InputBase
                placeholder="Search…"
                value={name}
                name="name"
                onChange={handleChange}
                type="text"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </form>
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <ProfileMenu handleLogout={handleLogout} />

            <FriendsInvites />

            <IconButton
              onClick={openDrawer}
              aria-label="show 0 new mails"
              color="inherit"
            >
              <Badge
                badgeContent={!user ? 0 : user.unreadMessages.length}
                color="secondary"
              >
                <ChatIcon />
              </Badge>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};
export default withStyles(styles)(NavbarItems);
