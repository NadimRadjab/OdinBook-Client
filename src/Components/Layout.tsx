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
interface Props {
  classes: any;
  props: any;
}

const Layout: FC<Props> = ({ props, classes }) => {
  const isToken = !!localStorage.getItem("token");
  const userLoading = useSelector((state: any) => state.auth.isLoading);

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
      <div className={classes.chatBox}>
        <ChatBox />
      </div>
    </div>
  );
};
export default withStyles(styles)(Layout);
