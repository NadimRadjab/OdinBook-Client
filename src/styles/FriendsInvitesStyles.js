import { createStyles } from "@material-ui/core/styles";
const styles = createStyles({
  friendListContainer: {
    width: "400px",
    height: "250px",
    overflow: "auto",
  },
  friendList: {
    height: "110px",
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    gridTemplateColumns: "2fr 1fr ",
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  buttons: {
    "&& button": {
      margin: "0.5rem",
    },
  },
});

export default styles;
