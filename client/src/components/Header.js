import React from "react";
import { makeStyles } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

import AddItem from "./AddItem";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(0.3, 0.3, 0.3, 0.3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: (props) =>
      props.loggedIn ? "hsla(0,0%,100%,.24)" : "rgba(0,0,0,.32)",
    color: "black",
    fontWeight: "bold",
    fontSize: "23px",
    textAlign: "center",
    fontFamily: "Pacifico",
    top: "0",
    position: "fixed",
    width: "100%",
    zIndex: 1,
  },
  trellis: {
    color: "black",
    textShadow: "2px 2px white",
    zIndex: 100,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
      cursor: "pointer",
    },
  },
  username: {
    width: "500px",
    textShadow: "2px 2px white",
    height: "30px",
    position: "fixed",
    fontFamily: "Pacifico",
    zIndex: 500,
    overflowX: "hidden",
    overflowY: "hidden",
    fontWeight: "bold",
    color: "black",
    textAlign: "right",
    right: 110,
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
}));

function Header({ loggedIn = false, path, btnText, icon }) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push(`${path}`);
  };

  return (
    <>
      <div className={classes.header}>
        <Link to="/" style={{ textDecoration: "none", flexBasis: "100%" }}>
          <div className={classes.trellis}>Trellis</div>
        </Link>

        {loggedIn ? (
          <div style={{ display: "flex", margin: "10px" }}>
            <div className={classes.username}></div>
            <div
              style={{
                position: "fixed",
                marginTop: "-5px",
                right: 0,
                marginLeft: "10px",
                zIndex: 200,
              }}
            >
              <AddItem
                btnText="Logout"
                type="menu"
                // icon={<ExitToAppIcon fontSize="small" />}
                width="85px"
                color="white"
              />
            </div>
          </div>
        ) : null}
        {!loggedIn ? (
          <div
            style={{
              display: "flex",
              float: "right",
              margin: "10px",
            }}
          >
            <div
              style={{
                marginTop: "-5px",
                zIndex: 200,
                marginLeft: "10px",
              }}
            >
              <AddItem
                btnText={btnText}
                type="menu"
                icon={icon}
                width="85px"
                color="white"
                noshadow
                handleClick={handleClick}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Header;
