import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import Home from "./Home";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/LayoutStyles";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

interface Props {
  classes: any;
  props: any;
}

const Layout: FC<Props> = ({ props, classes }) => {
  const isToken = !!localStorage.getItem("token");
  const dispatch = useDispatch();
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
        </Switch>
      </main>
    </div>
  );
};
export default withStyles(styles)(Layout);
