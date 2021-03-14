import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "../../firebase/Firebase";
import ResetPassword from "./ResetPassword";
import { useFormik } from "formik";
import PhoneIcon from "@material-ui/icons/Phone";
import axios from "axios";
import "./Forget.scss";

const initialValues = {
  mobile: "",
  otp: "",
};
const validate = () => {
  let errors = {};
  return errors;
};
const ForgetPassword = () => {
  const [isVerified, setVerification] = useState(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (values.mobile.length === 10) {
        const mobiledata = {
          userMobile: values.mobile,
        };
        axios
          .post("/userverification", mobiledata)
          .then((res) => {
            document.querySelector("label").textContent = "";
            if (res.data.message === true) {
              let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
              let number = "+91" + values.mobile;
              firebase
                .auth()
                .signInWithPhoneNumber(number, recaptcha)
                .then(function (e) {
                  let code = prompt(
                    "we texted to your mobile,please enter the otp",
                    ""
                  );
                  if (code == null) return;
                  e.confirm(code)
                    .then(function (result) {
                      document.querySelector("label").textContent =
                        result.user.phoneNumber + "  OTP verified";
                      setVerification(true);
                    })
                    .catch((error) => {});
                });
            } else {
              document.querySelector("label").textContent =
                "Your mobile number is not registered with us ,please register";
            }
          })
          .catch((err) => {
            document.querySelector("label").textContent =
              "Unable to verify your mobile number,Please try after some time";
          });
      }
    },
    validate,
  });
  return (
    <div className="forgetpage" data-testid="forget-test">
      {isVerified ? (
        <ResetPassword mobile={formik.values.mobile}></ResetPassword>
      ) : (
        <form className="forgetform" onSubmit={formik.handleSubmit}>
          <h4
            style={{
              color: "#0d3b66",
              " text-align": "center",
              margin: "auto",
              "margin-bottom": "4%",
              fontFamily: "serif",
              "border-bottom": "1px solid",
            }}
          >
            Provide registered mobile
          </h4>
          <label></label>
          <div className="inputWithIcon">
            <PhoneIcon style={{ width: "2em" }}></PhoneIcon>
            <input
              placeholder="phone number"
              name="mobile"
              id="mobile"
              onChange={formik.handleChange}
              value={formik.values.mobile}
            ></input>
          </div>
          <div id="recaptcha" style={{ "margin-left": "16%" }}></div>
          <button className="btn btn-primary" id="submit" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};
export default ForgetPassword;
