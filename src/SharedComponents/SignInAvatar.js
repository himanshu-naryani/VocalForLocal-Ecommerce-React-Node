import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Signout from "../Components/UserSignin/Signin/Signout";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    style={{ textDecoration: "none" }}
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(() => !value)}
        </ul>
      </div>
    );
  }
);
function SignInAvatar(props) {
  let google = props.googleData;


  const classes = useStyles();

  let userName = "";
  if (props.user && props.user.data && props.user.data.userdata)
    userName = props.user.data.userdata.userName;
  let history = useHistory();


  return (
    <Dropdown drop="left">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {(!userName && !google) ? (
          <Avatar></Avatar>
        ) : (
            <div>
              {google != null && google.displayName ? (
                <Avatar className={classes.orange}>
                  {google.displayName[0]}
                </Avatar>
              ) : (
                  <Avatar className={classes.orange}>{userName[0]}</Avatar>
                )}
            </div>
          )}
      </Dropdown.Toggle>

      {!userName && !google ? (
        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Item
            onClick={() => {
              history.push("/Signin");

            }}
          >
            Sign In
          </Dropdown.Item>
        </Dropdown.Menu>
      ) : (
          <Dropdown.Menu as={CustomMenu} style={{ margin: "100% 0 -100% 300px" }}>
            <Dropdown.Item onClick={() => {
              history.push("/profile");

            }}>My Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => {
              history.push("/orderHistory");
            }} >Order History</Dropdown.Item>
            {!google && props.user.data.userdata.userIsAdmin && <Dropdown.Item onClick={() => {
              history.push("/admin");
            }}>Admin</Dropdown.Item>}
            {(google != null && google != false) ? (
              <Dropdown.Item onClick={() => {
                history.push("/Signin");

              }}>Sign Out</Dropdown.Item>
            ) : (
                <Dropdown.Item onClick={() => {
                  history.push("/Signout");

                }}>Sign Out</Dropdown.Item>
              )}
          </Dropdown.Menu>
        )}
    </Dropdown>
  );
}

const mapStateToProps = (state) => ({
  user: state.signin.data,
  googleData: state.signin.googleData,
});

export default connect(mapStateToProps, null)(SignInAvatar);
