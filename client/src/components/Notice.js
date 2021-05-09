import React from "react";
import { makeStyles } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  errorNotice: {
    border: (props) =>
      props.success ? "1px solid green" : "1px solid #e07c7c",
    borderRadius: 8,
    display: "flex",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: (props) =>
      props.success === true ? "#43A047" : "#f8d6d6",
    width: "320px",
    padding: theme.spacing(0.5),
    marginLeft: theme.spacing(-1.75),
  },
  button: {
    all: "unset",
    marginTop: theme.spacing(0.8),
  },
  cancel: {
    color: (props) => (props.success === true ? "#39DB80" : "red"),
  },
}));

function Notice({ error, success, clearError }) {
  const classes = useStyles({ success });
  return (
    <div className={classes.errorNotice}>
      <span>{error}</span>
      <button className={classes.button} onClick={clearError}>
        <CancelIcon className={classes.cancel} />
      </button>
    </div>
  );
}

export default Notice;
