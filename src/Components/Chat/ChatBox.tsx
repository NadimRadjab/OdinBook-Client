import React from "react";
import {
  createStyles,
  Theme,
  makeStyles,
  alpha,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import InputBase from "@material-ui/core/InputBase";

import { Container, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   right: 0,
      width: "27%",
    },
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      height: "270px",
      overflow: "auto",
    },
    header: {
      display: "flex",
      margin: "1rem",
      alignItems: "center",
    },
    list: {
      //   marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      backgroundColor: "#3f50b5",
    },
    grow: {
      flexGrow: 1,
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(4),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  })
);

const ChatBox = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper square className={classes.paper}>
        <div className={classes.header}>
          <Avatar alt="Profile Picture" />
          <Typography className={classes.text} variant="h5" gutterBottom>
            Name
          </Typography>
        </div>
        <Divider />
        <List className={classes.list}>
          <React.Fragment key={1}>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" />
              </ListItemAvatar>
              <ListItemText />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" />
              </ListItemAvatar>
              <ListItemText />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" />
              </ListItemAvatar>
              <ListItemText />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" />
              </ListItemAvatar>
              <ListItemText />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" />
              </ListItemAvatar>
              <ListItemText />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" />
              </ListItemAvatar>
              <ListItemText />
            </ListItem>
          </React.Fragment>
        </List>
      </Paper>
      <div color="primary" className={classes.appBar}>
        <Toolbar>
          <div className={classes.search}>
            <form>
              <InputBase
                placeholder="Message..."
                value=""
                name="name"
                type="text"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "Message" }}
              />
            </form>
          </div>
          <IconButton edge="start" color="inherit" aria-label="close drawer">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </div>
    </div>
  );
};

export default ChatBox;
