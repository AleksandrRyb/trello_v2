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

  //If token exists and got success from tokenValidation, get user info
  //Render only when isValid or token are changed
  React.useEffect(() => {
    if (isValid) {
      dispatch(getUserInfo(token));
    }
  }, [isValid, token, dispatch]);

  //Every render of app check for token is valid
  //Get token not from reducer but from local storage
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
