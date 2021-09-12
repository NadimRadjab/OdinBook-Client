import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import Sidebar from "./navigation/Sidebar";
import Home from "./Home";

function Layout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
        </Switch>
      </main>
    </>
  );
}
export default Layout;
