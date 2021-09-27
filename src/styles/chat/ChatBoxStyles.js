import { createStyles, alpha } from "@material-ui/core/styles";
const styles = createStyles((theme) => ({
  root: {
    margin: "0 1rem 0",
    width: "370px",
    pointerEvents: "auto",
  },
  text: {
    padding: theme.spacing(1, 2, 0),
  },
  paper: {
    overflow: "auto",
    height: "300px",
  },
  header: {
    display: "flex",
    backgroundColor: "white",
    margin: "1rem",
    alignItems: "center",
  },
  list: {
    marginBottom: theme.spacing(1),
    width: "85%",
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    backgroundColor: "#3f50b5",
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    "&& button": {
      display: "none",
    },
    marginRight: theme.spacing(4),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "23ch",
    },
  },
}));

export default styles;
