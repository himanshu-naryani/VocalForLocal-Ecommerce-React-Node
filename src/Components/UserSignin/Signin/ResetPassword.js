import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import "./Reset.scss";
import { useHistory } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import axios from "axios";

import LockOpenIcon from '@material-ui/icons/LockOpen';

const initialValues = {
  email: "",
  newPassword: "",
};
const validate = (values) => {
  let errors = {};
  return errors;
};
const ResetPassword = (props) => {
  let history = useHistory();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      
      const newcredentials = {
        userMobile: props.mobile,
        userPassword: values.password,
      };
      axios
        .put("/updatepassword", newcredentials)
        .then((res) => {
          document.querySelector("label").textContent =
            "Password updated succesfully";
          history.push("/Signin");
        })
        .catch((err) => {
          
          document.querySelector("label").textContent =
            "Sorry!Unable to update new password";
        });
    },
    validate,
  });
  return (
    <div>
      <div className="resethere">
        <label
          style={{ fontWeight: "bolder", margin: "auto", "marginLeft": "10%" }}
        ></label>
        <form className="resetform" onSubmit={formik.handleSubmit}>
          <h4
            style={{
              colro: "#0d3b66",
              "text-align": "center",
              margin: "auto",
              "marginBottom": "4%",
              fontFamily: "serif",
              "border-bottom": "1px solid",
            }}
          >
            Reset your password
          </h4>
          <div className="inputWithIcon">
            <LockIcon style={{ width: "2em" }}></LockIcon>
            <input
              placeholder="New Password"
              name="password"
              type="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            ></input>
          </div>
          <div className="inputWithIcon">
          <LockOpenIcon style={{ width: "2em" }}></LockOpenIcon>
            <input
              placeholder="confirm password"
              id="cpassword"
              name="confirm"
              onChange={formik.handleChange}
              value={formik.values.confirm}
              
            ></input>
          </div>
          <button className="btn btn-primary" id="submit" type="submit">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
