import { createStyles } from "@material-ui/core";
const styles = createStyles({
  root: {
    height: "90vh",
    width: "22%",
    borderRight: "1px solid gray",
  },
  imgContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&& a": {
      margin: "0.2rem",
    },
  },
  profilePic: {
    margin: "1rem",
    width: "170px",
    height: "170px",
  },
  friendList: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  friendPic: {
    margin: "0.3rem",
    width: "70px",
    height: "70px",
  },
  viewFriends: {
    display: "flex",
    justifyContent: "center",
    margin: "0.3rem",
  },
});

export default styles;
