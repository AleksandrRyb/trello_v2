import React from "react";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import { loginUser } from "../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./Auth";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const dispatch = useDispatch();
  const { token, user, loginSuccess, loginRequest, loginError } = useSelector(
    (state) => state.user
  );

  const history = useHistory();

  React.useEffect(() => {
    document.title = "Treillis | Login";
  });

  React.useEffect(() => {
    if (user.username) {
      history.push(`/${user.username}/boards`);
    }
  }, [user, history]);

  React.useEffect(() => {
    if (!loginRequest) {
      if (token && loginSuccess) {
        setError("Logged In successfully ✔");
        setSuccess(true);
        localStorage.setItem("auth-token", token);
      } else if (!token && !loginSuccess) {
        setError(loginError);
        setSuccess(false);
      }
    }
  }, [loginRequest, loginSuccess, token, user, loginError, history]);

  const usernameChangeHandler = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const user = { username, password };
    dispatch(loginUser(user));
    setPassword("");
    setUsername("");
  };

  return (
    <>
      <Auth
        btnText="Register"
        path="/register"
        authName="Login"
        icon={<HowToRegIcon fontSize="small" />}
        error={error}
        clearError={() => setError(undefined)}
        submitHandler={submitHandler}
        username={username}
        usernameChangeHandler={usernameChangeHandler}
        password={password}
        passwordChangeHandler={passwordChangeHandler}
        success={success}
      />
    </>
  );
}

export default Login;
