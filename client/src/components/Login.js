import React from "react";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import { useHistory } from "react-router-dom";

import Auth from "./Auth";

function Login() {
  return (
    <>
      <Auth
        btnText="Register"
        path="/register"
        authName="Login"
        icon={<HowToRegIcon fontSize="small" />}
        //   error={error}
        //   clearError={() => setError(undefined)}
        //   submitHandler={submitHandler}
        //   username={username}
        //   nameChangeHandler={(e) => {
        //     e.preventDefault()
        //     setUsername(e.target.value)
        //   }}
        //   password={password}
        //   passwordChangeHandler={(e) => {
        //     e.preventDefault()
        //     setPassword(e.target.value)
        //   }}
        //   passwordCheck={passwordCheck}
        //   passwordCheckChangeHandler={(e) => {
        //     e.preventDefault()
        //     setPasswordCheck(e.target.value)
        //   }}

        //   success={success}
      />
    </>
  );
}

export default Login;
