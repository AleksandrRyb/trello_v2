import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";

import { getUserInfo, validateToken } from "./redux/actions/userActions";

function App() {
  const { isValid, userRequest, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //Check if token valid to get user info
  React.useEffect(() => {
    if (isValid) {
      dispatch(getUserInfo(token));
    }
  }, [isValid, token, dispatch]);

  //Check for token is valid every dispatch or token change
  React.useEffect(() => {
    let token = localStorage.getItem("auth-token");
    if (!token) {
      localStorage.setItem("auth-token", "");
      token = "";
    }

    dispatch(validateToken(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/:user/boards" component={Main} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
