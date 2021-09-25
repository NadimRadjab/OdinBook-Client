import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import Home from "./Home";
import ViewUser from "./users/ViewUser";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/LayoutStyles";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchUsers from "./users/SearchUsers";
import ChatBox from "./Chat/ChatBox";
import { State } from "../redux/reducers";

interface Props {
  classes: any;
  props?: any;
}
// interface Chat {
//   chat: { _id: string; participants: {}[] };
// }
const Layout: FC<Props> = ({ classes, props }): JSX.Element => {
  const isToken = !!localStorage.getItem("token");
  const userLoading = useSelector((state: State) => state.auth.isLoading);
  const chats = useSelector((state: State) => state.conversation.chat);
  const chatIsLoading = useSelector(
    (state: State) => state.conversation.isLoading
  );

  if (!isToken) {
    return <Redirect to="/login" />;
  }

  if (userLoading) return <div></div>;
  return (
    <div className={classes.root}>
      <Navbar />

      <main className={classes.main}>
        <Switch>
          <Route exact path="/" render={() => <Home {...props} />} />
          <Route exact path="/s" render={() => <SearchUsers {...props} />} />
          <Route exact path="/:id" render={() => <ViewUser {...props} />} />
        </Switch>
      </main>
      {chatIsLoading ? (
        <div></div>
      ) : (
        <div className={classes.chatBox}>
          {chats.map(
            (chat: any): JSX.Element => (
              <ChatBox key={chat._id} chat={chat} />
            )
          )}
        </div>
      )}
    </div>
  );
};
export default withStyles(styles)(Layout);
