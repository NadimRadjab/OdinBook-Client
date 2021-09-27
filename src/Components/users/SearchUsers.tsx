import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
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

interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  image: {
    url: string;
  }[];
}
const SearchUsers: React.FC = () => {
  const classes = useStyles();
  const profiles = useSelector((state: State) => state.users.searchedUsers);
  const user = useSelector((state: State) => state.mainUser.user);
  const profilesLoading = useSelector(
    (state: State) => state.users.isUserLoading
  );
  const history = useHistory();
  const viewProfile = (id: string) => {
    if (id === user._id) return history.push(`/`);
    history.push(`/${id}`);
  };
  const renderProfiles = () => {
    if (!profiles.length)
      return (
        <div className="loading">
          <Typography color="primary" variant="h4">
            User not found...
          </Typography>
        </div>
      );
    return profiles.map((profile: Profile) => (
      <div key={profile._id}>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt={"Avatar"} src={profile.image[0].url} />
          </ListItemAvatar>
          <ListItemText id={profile._id} primary={`${profile.fullName} `} />
          <ListItemSecondaryAction>
            <Button
              onClick={viewProfile.bind(this, profile._id)}
              variant="contained"
              color="primary"
            >
              View Profile
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </div>
    ));
  };

  if (profilesLoading)
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  return <List className={classes.root}>{renderProfiles()}</List>;
};
export default SearchUsers;
