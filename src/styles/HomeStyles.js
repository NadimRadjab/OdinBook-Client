import { createStyles } from "@material-ui/core/styles";
const styles = createStyles({
  root: {
    height: "90vh",
    display: "grid",
    gridTemplateColumns: "30% 65% ",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin: "1rem",
  },
  form: {
    marginBottom: "4rem",
  },
});
export default styles;
