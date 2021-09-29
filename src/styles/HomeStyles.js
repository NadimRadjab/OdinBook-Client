import { createStyles } from "@material-ui/core";

const styles = createStyles((theme) => ({
  root: {
    height: "90vh",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "30% 65% ",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "45% 55% ",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr ",
    },
  },
  card: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin: "1rem",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  form: {
    marginBottom: "4rem",
  },
}));
export default styles;
