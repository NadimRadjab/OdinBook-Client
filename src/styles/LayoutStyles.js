import { createStyles } from "@material-ui/core/styles";
const styles = createStyles({
  root: {
    width: "100%",
    height: "100vh",
  },

  main: {},
  chatBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    pointerEvents: "none",
    position: "fixed",
    top: "auto",
    bottom: 0,
    width: "95%",
  },
});
export default styles;
