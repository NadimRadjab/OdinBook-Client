import "./App.css";

import { Switch, Route } from "react-router-dom";
import Layout from "./Components/Layout";
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
      <div className="App">
        <Switch>
          <Route exact path="/login" render={() => <Login {...props} />} />{" "}
          <Route
            path="/"
            render={(routeProps) => <Layout {...props} {...routeProps} />}
          />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
