import React from "react";
import { makeStyles, Paper } from "@material-ui/core";

import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "fixed",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  form: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    width: "280px",
    backgroundColor: "rgba(9,30,66, 0.8)",
  },
  input: {
    outline: "none",
    marginMottom: theme.spacing(2),
    padding: theme.spacing(1),
    marginRight: "90px",
    marginLeft: "55px",
    backgroundColor: "hsla(0, 0%, 100%, .7)",
    border: "2px solid #DFE1E6",
    borderRadius: 3,
    boxSizing: "border-box",
    "&:focus": {
      border: "2px solid #4C9AFF",
      backgroundColor: "#ffffff",
    },
  },
  submit: {
    backgroundColor: "#51BD4f",
    color: "white",
    fontWeight: "bold",
    opacity: 0.9,
    all: "unset",
    borderRadius: 5,
    alignItems: "center",
    width: "100px",
    padding: theme.spacing(0.8),
    margin: theme.spacing(2, 2, 7, 2),
    "&:hover": {
      opacity: 1.6,
    },
  },
}));

function Auth({
  btnText,
  path,
  icon,
  authName,
  register,
  username,
  usernameChangeHandler,
  password,
  passwordChangeHandler,
  passwordCheck,
  passwordCheckChangeHandler,
}) {
  const classes = useStyles();

  return (
    <div>
      <Header btnText={btnText} path={path} icon={icon} />
      <div className={classes.wrapper}>
        <Paper elevation={1} className={classes.form}>
          <div
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              marginTop: "35px",
              color: "#5E6C84",
              fontSize: "18px",
              fontWeight: "bold",
              paddingBottom: "30px",
            }}
          >
            {authName} to Trellis
          </div>
          <form>
            <label htmlFor={`${authName}-username`}></label>
            <input
              className={classes.input}
              type="text"
              placeholder="Enter Username"
              onChange={usernameChangeHandler}
              value={username}
            />

            <label htmlFor={`${authName}-password`}></label>
            <input
              className={classes.input}
              type="password"
              placeholder="Enter Password"
              onChange={passwordChangeHandler}
              value={password}
            />
            {register ? (
              <>
                <label htmlFor={`${authName}-verify-password`}></label>
                <input
                  className={classes.input}
                  type="password"
                  placeholder="Enter Password Again"
                  onChange={passwordCheckChangeHandler}
                  value={passwordCheck}
                />
              </>
            ) : null}
            <input className={classes.submit} type="submit" value={authName} />
          </form>
        </Paper>
      </div>
    </div>
  );
}

export default Auth;
