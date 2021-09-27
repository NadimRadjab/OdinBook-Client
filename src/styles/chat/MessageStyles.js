import { createStyles } from "@material-ui/core/styles";
const styles = createStyles({
  listItem: {},
  message: {
    display: "flex",
    color: "#Fdfff5",
    flexDirection: "column",
    flex: "initial",
    padding: "0.5rem",
    borderRadius: "10%",
    backgroundColor: (props) => {
      return props.message.sender !== props.currentUser ? "#0084ff" : "#898F9C";
    },
  },
  avatar: {
    alignSelf: "flex-start",
  },
});
export default styles;
