import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import Sidebar from "./navigation/Sidebar";
import Home from "./Home";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/LayoutStyles";
interface Props {
  classes: any;
  props: any;
}

const Layout: FC<Props> = ({ props, classes }) => {
  return (
    <div className={classes.root}>
      <Navbar />

      <main className={classes.main}>
        <Switch>
          <Route exact path="/" render={() => <Home {...props} />} />
        </Switch>
      </main>
    </div>
  );
};
export default withStyles(styles)(Layout);
