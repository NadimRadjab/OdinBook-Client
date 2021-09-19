import { createStyles } from "@material-ui/core";
const styles = createStyles((theme) => ({
  root: {
    margin: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  items: {
    display: "flex",
    flexDirection: "column",
    height: "400px",
    width: "500px",
    justifyContent: "center",
    alignItems: "center",
    "&& input": {
      display: "none",
    },
    "&& img": {
      width: "300px",
      height: "300px",
      margin: "2rem",
    },
    "&& label": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
}));

export default styles;
