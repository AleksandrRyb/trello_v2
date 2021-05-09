import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InputIcon from "@material-ui/icons/Input";
import Auth from "./Auth";
import { registerUser } from "../redux/actions/userActions";

function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");
  const dispatch = useDispatch();
  const { registerError, registerSuccess, registerRequest } = useSelector(
    (state) => state.user
  );
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    document.title = "Trellis | Register";
  });

  React.useEffect(() => {
    if (!registerRequest && registerSuccess) {
      setError("Successfully Registered ✔");
      localStorage.setItem("auth-token", "");
      window.location.href = "/";
      setSuccess(true);
    } else if (!registerRequest && !registerSuccess) {
      setError(registerError);
      setSuccess(false);
    }
  }, [registerRequest, registerSuccess, registerError]);

  const usernameChangeHandler = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const passwordCheckChangeHandler = (e) => {
    e.preventDefault();
    setPasswordCheck(e.target.value);
  };

  //Send the form
  const submitHandler = (e) => {
    e.preventDefault();
    const user = { username, password, passwordCheck };
    dispatch(registerUser(user));
    setUsername("");
    setPassword("");
    setPasswordCheck("");
  };

  return (
    <>
      <Auth
        btnText="Login"
        path="/"
        authName="Register"
        icon={<InputIcon fontSize="small" />}
        error={error}
        clearError={() => setError(undefined)}
        success={success}
        submitHandler={submitHandler}
        username={username}
        usernameChangeHandler={usernameChangeHandler}
        password={password}
        passwordChangeHandler={passwordChangeHandler}
        passwordCheck={passwordCheck}
        passwordCheckChangeHandler={passwordCheckChangeHandler}
        register
      />
    </>
  );
}

export default Register;
