import "./App.css";

import { Switch, Route } from "react-router-dom";
import Main from "./Components/Main";
import Login from "./Components/auth/Login";
import store from "./redux/store";
import { Provider } from "react-redux";
import { loadUser } from "./redux/actions/user/userActions";
import { useEffect } from "react";

function App(props: any) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/login" render={() => <Login {...props} />} />{" "}
        <Route
          exact
          path="/"
          render={(routeProps) => <Main {...props} {...routeProps} />}
        />
        <Route render={(routeProps) => <Main {...props} {...routeProps} />} />
      </Switch>
    </Provider>
  );
}

export default App;
