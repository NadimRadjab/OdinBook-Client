import "./App.css";

import { Switch, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Components/auth/Login";
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authActions";
import { useEffect } from "react";

function App(props: any) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <Switch>
          <Route exact path="/login" render={() => <Login {...props} />} />
          <Route exact path="/" render={() => <Layout {...props} />} />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
