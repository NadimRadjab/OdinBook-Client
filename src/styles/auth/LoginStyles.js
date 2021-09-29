import { createStyles } from "@material-ui/core/styles";
import bg from "./bg.svg";
const styles = createStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    /* background by SVGBackgrounds.com */
    backgroundColor: "#003CB3",
    backgroundImage: `url(${bg})`,
  },
  title: {
    fill: "#35322a",
    color: "#fff",
    fontFamily: "Playfair Display",
    fontSize: " 120px",
    letterSpacing: "-4px",
    textTransform: "uppercase",
    animation: "blur .75s ease-out infinite",
    textShadow: "0px 0px 5px #fff, 0px 0px 7px #fff",
    fontWeight: 900,
    [theme.breakpoints.down("xs")]: {
      fontSize: " 60px",
    },
  },
  form: {
    width: 450,
    height: 350,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: 300,
      height: 300,
    },
  },
  inputs: {
    display: "flex",
    width: "300px",
    flexDirection: "column",
    margin: "1rem",
    "&& .MuiTextField-root": {
      margin: "0.4rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: 200,
    },
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    "&& button": {
      margin: "0.2rem",
    },
  },
  alert: {
    width: "80%",
  },
}));
export default styles;
