import React from "react";

import InputIcon from "@material-ui/icons/Input";
import Auth from "./Auth";

function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");

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

  return (
    <>
      <Auth
        btnText="Login"
        path="/"
        authName="Register"
        icon={<InputIcon fontSize="small" />}
        //   error={error}
        //   clearError={() => setError(undefined)}
        //   submitHandler={submitHandler}
        username={username}
        usernameChangeHandler={usernameChangeHandler}
        password={password}
        passwordChangeHandler={passwordChangeHandler}
        passwordCheck={passwordCheck}
        passwordCheckChangeHandler={passwordCheckChangeHandler}
        register
        //   success={success}
      />
    </>
  );
}

export default Register;
