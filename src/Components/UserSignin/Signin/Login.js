import React, { useState, useEffect } from "react";
import firebase from "../../firebase/Firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./Login.scss";
import { useFormik } from "formik";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import swal from "sweetalert";
import {
  loginSucess,
  loginFailure,
  logOut,
  googleLogin,
  loginRequest,
} from "../../../Redux/Actioncreators/Actions";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const styleColor = { color: "#000" };
const initialValues = {
  email: "",
  password: "",
};
const validate = (values) => {
  let errors = {};
  if (values.email.length > 25) {
    errors.email = "Email is too long";
  }
  return errors;
};
function LoginForm(props) {
  let { data, loginUser, loginError } = props;
  const [isSignedIn, setSignedIn] = useState(null);
  let history = useHistory();
  const uiConfig = {
    signFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const credentials = {
        userEmail: values.email,
        userPassword: values.password,
      };
      props.loginRequest();
      axios
        .post("/userSignin", credentials)
        .then((res) => {
          console.log(res);
          loginUser(res);
          if (res.data.userdata) {
            swal("Login successful", "Welcome Back ");
          } else {
            swal("Login unsuccessful", "Invalid Credentials");
          }
        })
        .catch((err) => {
          loginError(err);
          swal("Login unsuccessful");
        });
      if (data.data !== undefined && data.data.userdata === null) {
        document.querySelector("label").textContent = "Invalid credentials";
      }
    },
    validate,
  });
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setSignedIn(user);
    });
  }, []);

  if (isSignedIn != null) {
    props.googleLogin(isSignedIn);

    let gdata = JSON.stringify(isSignedIn);
    localStorage.setItem("gdata", gdata);
  }
  return (
    <div className="maincontainer">
      {props.googleData !== null && props.googleData !== false ? (
        <span
          className="googlesignout"
          style={{ marginBottom: "15%", marginTop: "10%" }}
        >
          <h2 style={{ "font-weight": "bold" }}>Thank you</h2>
          <button
            onClick={async () => {
              await firebase.auth().signOut();
              props.googleLogin(null);
            }}
            style={{ width: "100%" }}
            className="btn btn-primary"
            id="signout"
          >
            SIGN OUT
          </button>
        </span>
      ) : (
        <div>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
          {props.loading ? (
            <CircularProgress
              style={{ marginLeft: "47%", color: "orange" }}
            ></CircularProgress>
          ) : null}

          {data.data === undefined || data.data.userdata === null ? (
            <div className="login">
              <div className="loginform">
                <form onSubmit={formik.handleSubmit}>
                  <h3 style={{ fontWeight: "bold" }}>Welcome </h3>
                  <div className="inputWithIcon">
                    <EmailIcon style={{ width: "2em" }}></EmailIcon>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    ></input>
                  </div>

                  {formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}

                  <div className="inputWithIcon">
                    <LockIcon style={{ width: "2em" }}></LockIcon>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    ></input>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-secondary btn-lg"
                    id="submit"
                  >
                    LOGIN
                  </button>
                </form>
              </div>
              <div className="additionalform">
                <div className="additional">
                  <div
                    to="/ForgetPassword"
                    activeStyle={styleColor}
                    className="nav"
                    onClick={() => {
                      history.push("/ForgetPassword");
                    }}
                  >
                    ForgetPassword ?
                  </div>
                </div>
                <div className="additional">
                  <div
                    to="/Signup"
                    activeStyle={styleColor}
                    className="nav"
                    onClick={() => {
                      history.push("/Signup");
                    }}
                  >
                    Signup Here
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {data.data.userdata.userIsAdmin
                ? history.push("/admin")
                : history.goBack()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    data: state.signin.data,
    googleData: state.signin.googleData,
    loading: state.signin.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginRequest: () => dispatch(loginRequest()),
    loginUser: (userdata) => dispatch(loginSucess(userdata)),
    loginError: (error) => dispatch(loginFailure(error)),
    logoutUser: () => dispatch(logOut()),
    googleLogin: (googleData) => dispatch(googleLogin(googleData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
