import { createStyles } from "@material-ui/core/styles";
import bg from "./bg.svg";
const styles = createStyles({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    /* background by SVGBackgrounds.com */
    backgroundColor: "#003CB3",
    backgroundImage: `url(${bg})`,
  },
  form: {
    width: 450,
    height: 350,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    display: "flex",
    width: "300px",
    flexDirection: "column",
    margin: "1rem",
    "&& .MuiTextField-root": {
      margin: "0.4rem",
    },
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    "&& button": {
      margin: "0.2rem",
    },
  },
});
export default styles;