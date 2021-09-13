import { createStyles } from "@material-ui/core/styles";
const styles = createStyles({
  root: {
    height: "90vh",
    display: "grid",
    gridTemplateColumns: "35% 65% ",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin: "1rem",
  },
});
export default styles;
