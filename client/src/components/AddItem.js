import React from "react";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  add: {
    textTransform: "none",
    margin: theme.spacing(1, 1, 1, 1),
    padding: "10px",
    justifyContent: "left",
    opacity: 0.8,
    fontWeight: (props) =>
      props.type === "background" ||
      props.type === "menu" ||
      props.type === "list"
        ? "bold"
        : "inherit",
    backgroundColor: (props) =>
      props.type !== "card" ? "hsla(0,0%,100%,.24)" : "inherit",
    "&:hover": {
      opacity: 1,
      backgroundColor: "rgba(9,30,66,.08)",
    },
    textShadow: (props) =>
      !props.noshadow &&
      (props.type === "menu" || props.type === "list") &&
      "2px 2px black",
  },
  // width: (props) => ({
  //   width: props.width,
  //   color: props.color,
  // }),
}));

function AddItem({
  btnText = null,
  type,
  icon,
  width,
  color,
  noshadow,
  handleClick,
}) {
  const classes = useStyles({ type, width, noshadow, color });
  return (
    <Button className={`${classes.add} ${classes.width}`} onClick={handleClick}>
      {icon} {btnText}
    </Button>
  );
}

export default AddItem;
