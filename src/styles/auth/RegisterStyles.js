import { createStyles } from "@material-ui/core";

const styles = createStyles((theme) => ({
  form: {
    width: "500px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    "&& label": {
      [theme.breakpoints.down("xs")]: {
        width: 300,
      },
    },
    "&& input": {
      [theme.breakpoints.down("xs")]: {
        width: 300,
      },
    },
  },

  genderLabel: {
    margin: "1rem 5rem",
  },
  genderContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
}));
export default styles;
