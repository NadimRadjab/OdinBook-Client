import { createStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const styles = createStyles((theme) => ({
  root: {
    width: 550,
    margin: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      width: 400,
    },
    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
  },
  media: {
    height: "500px",
  },
  like: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  expand: {
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },

  avatar: {
    backgroundColor: red[500],
  },
}));
export default styles;
