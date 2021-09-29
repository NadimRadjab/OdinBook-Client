import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Button, Divider, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducers";
import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "90%",
      padding: "5rem",
      backgroundColor: theme.palette.background.paper,
      "& button": {
        margin: "1rem",
      },
      "& li": {
        margin: "1rem",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "2rem",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "1rem",
      },
    },
    items: {
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      },
    },
  })
);

interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  image: {
    url: string;
  }[];
}
const ViewFriends: React.FC = () => {
  const classes = useStyles();
  const user = useSelector((state: State) => state.mainUser.user);

  const history = useHistory();
  const viewProfile = (id: string) => {
    if (id === user._id) return history.push(`/`);
    history.push(`/${id}`);
  };
  const renderProfiles = () => {
    if (!user.friendList.length)
      return (
        <div className="loading">
          <Typography color="primary" variant="h4">
            Friend list is empty...
          </Typography>
        </div>
      );
    return user.friendList.map((profile: Profile) => (
      <div key={profile._id}>
        <ListItem className={classes.items}>
          <ListItemAvatar>
            <Avatar alt={"Avatar"} src={profile.image[0].url} />
          </ListItemAvatar>
          <ListItemText id={profile._id} primary={`${profile.fullName} `} />

          <Button
            onClick={viewProfile.bind(this, profile._id)}
            variant="contained"
            color="primary"
          >
            View Profile
          </Button>
        </ListItem>
        <Divider />
      </div>
    ));
  };

  if (!user)
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  return <List className={classes.root}>{renderProfiles()}</List>;
};
export default ViewFriends;
