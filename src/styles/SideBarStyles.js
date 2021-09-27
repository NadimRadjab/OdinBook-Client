import { createStyles } from "@material-ui/core";
const styles = createStyles({
  root: {
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
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
    boxShadow: "rgba(0, 0, 0, 0.35) 0px -35px 36px -28px inset",
  },
  profilePic: {
    margin: "1.5rem",
    width: "170px",
    height: "170px",
  },

  friendList: {
    display: "grid",
    marginTop: "0.5rem",
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
      borderRadius: "50%",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },

  viewFriends: {
    display: "flex",
    justifyContent: "center",
    margin: "0.3rem",
  },
});

export default styles;
