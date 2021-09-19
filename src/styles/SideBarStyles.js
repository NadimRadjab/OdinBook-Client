import { createStyles } from "@material-ui/core";
const styles = createStyles({
  root: {
    borderRight: "1px solid gray",
  },
  imgContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&& h5": {
      marginTop: "1rem",
    },
    "&& a": {
      marginBottom: "0.5rem",
    },
    "&& button": {
      marginBottom: "0.4rem",
    },
  },
  profilePic: {
    margin: "1.5rem",
    width: "170px",
    height: "170px",
  },
  friendList: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  friendsImg: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "&& img": {
      margin: "0.2rem",
      width: "70px",
      height: "70px",
    },
  },

  viewFriends: {
    display: "flex",
    justifyContent: "center",
    margin: "0.3rem",
  },
});

export default styles;
