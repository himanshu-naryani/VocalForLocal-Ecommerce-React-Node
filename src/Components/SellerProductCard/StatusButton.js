import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./StatusButton.css";
const useStyles = makeStyles({
  root: {
    background: (props) =>
      props.color === "red"
        ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        : props.color === "green"
        ? props.color === "green" &&
          "linear-gradient(45deg, #18F110 30%, #81FB7C 90%)"
        : props.color === "yellow" &&
          "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",

    border: 0,
    borderRadius: 10,
    boxShadow: (props) =>
      props.color === "red"
        ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
        : "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    height: 40,
    padding: "0 30px",
    margin: 0,
  },
});

function MyButton(props) {
  const { color, ...other } = props;
  const classes = useStyles(props);
  return <Button className={classes.root} {...other} />;
}

MyButton.propTypes = {
  color: PropTypes.oneOf(["green", "red", "yellow"]).isRequired,
};

export default function AdaptingHook(props) {
  return (
    <React.Fragment>
      <MyButton color={props.mycolor || "yellow"}>{props.status}</MyButton>
    </React.Fragment>
  );
}
