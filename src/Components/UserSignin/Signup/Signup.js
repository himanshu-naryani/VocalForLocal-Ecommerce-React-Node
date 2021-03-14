import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Signup.scss";
import LockIcon from "@material-ui/icons/Lock";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from '@material-ui/icons/Phone';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
var signedup;

const initialValues = {
  name: "",
  email: "",
  password: "",
  mobile: "",
  address: "",
  seller: "",
  bank: "",
  ifsc: "",
  gst: "",
  pan: "",
  aadhar: "",
};
var signupData = {};

const validate = (values) => {
  let errors = {};
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email";
  } else if (values.email.length > 25) {
    errors.email = "Incorrect email";
  }
  if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
      values.password
    )
  ) {
    errors.password = "password does not match the criteria";
  }
  if (!values.mobile) {
    errors.mobile = "Required...";
  } else if (!(values.mobile.length === 10)) {
    errors.mobile = "Check your mobile number";
  }
  return errors;
};
function SignupForm() {
  let history = useHistory();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);


      if (values.seller) {
        signupData = {
          userName: values.name,
          userEmail: values.email,
          userPassword: values.password,
          userMobile: values.mobile,
          userAddress: values.address,
          userIsSeller: true,
          userBankAccountNumber: values.bank,
          userIfscCode: values.ifsc,
          userGstNumber: values.gst,
          userPanNumber: values.pan,
          userAadharNumber: values.aadhar,
        };
      } else {
        signupData = {
          userName: values.name,
          userEmail: values.email,
          userPassword: values.password,
          userMobile: values.mobile,
          userAddress: values.address,
          userIsSeller: false,
        };
      }

      axios
        .post("/createUser", signupData)
        .then((response) => {
          signedup = true;
          history.push("/Signin");
        });
    },
    validate,
  });

  return (
    <div className="signupcontainer" data-testid="test-signup">
      <div className="signup">
        <form onSubmit={formik.handleSubmit} className="signupform">
          {signedup ? (
            <div className="error">Succesfully registered</div>
          ) : (
              <h2
                style={{
                  margin: "3%",
                  "margin-left": "29%",
                  "font-weight": "bold",
                }}
              >
                Register with us
              </h2>
            )}
          <div className="inputWithIcon">
            <AccountBoxIcon style={{ "width": "2em" }}></AccountBoxIcon>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="User name"
              required
              onChange={formik.handleChange}
              value={formik.values.name}
            ></input>
          </div>
          {formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
          <div className="inputWithIcon">
            <EmailIcon style={{ width: "2em" }}></EmailIcon>

            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
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
              placeholder="Password "
              name="password"
              required
              onChange={formik.handleChange}
              value={formik.values.password}
            ></input>
          </div>
          {formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <div className="inputWithIcon">
            <PhoneIcon style={{ "width": "2em" }}></PhoneIcon>
            <input
              type="string"
              id="mobile"
              required
              name="mobile"
              placeholder="Phone number"
              onChange={formik.handleChange}
              value={formik.values.mobile}
            ></input>
          </div>
          {formik.errors.mobile ? (
            <div className="error">{formik.errors.mobile}</div>
          ) : null}
          <div className="inputWithIcon">
            <LocationCityIcon style={{ "width": "2em" }}></LocationCityIcon>

            <input
              type="string"
              id="address"
              required
              name="address"
              placeholder="Address"
              onChange={formik.handleChange}
              value={formik.values.address}
            ></input>
          </div>
          {formik.errors.address ? (
            <div className="error">{formik.errors.address}</div>
          ) : null}
          <div className="inputWithIcon" style={{ marginLeft: "-4.5%" }}>
            <input
              type="checkbox"
              id="seller"
              name="seller"
              value={formik.values.seller}
              onChange={formik.handleChange}
            />
            <label for="seller" style={{ "margin": "2%" }}> I want to be a seller</label>
            <br></br>
            {formik.errors.seller === "Yes" ? (
              <div className="error">{formik.errors.seller}</div>
            ) : null}
          </div>

          {formik.values.seller ? (
            <div>
              <div className="inputWithIcon">
                <AccountBalanceIcon style={{ "width": '2em' }}></AccountBalanceIcon>
                <input
                  type="string"
                  id="bank"
                  name="bank"
                  required
                  placeholder="Bank account number"
                  onChange={formik.handleChange}
                  value={formik.values.bank}
                ></input>
              </div>
              {formik.errors.bank ? (
                <div className="error">{formik.errors.bank}</div>
              ) : null}
              <div className="inputWithIcon">
                <input
                  type="string"
                  id="ifsc"
                  required
                  name="ifsc"
                  placeholder="IFSC "
                  onChange={formik.handleChange}
                  value={formik.values.ifsc}
                ></input>
              </div>
              {formik.errors.ifsc ? (
                <div className="error">{formik.errors.ifsc}</div>
              ) : null}
              <div className="inputWithIcon">
                <input
                  type="string"
                  id="gst"
                  name="gst"
                  placeholder="GST"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.gst}
                ></input>
              </div>
              {formik.errors.gst ? (
                <div className="error">{formik.errors.gst}</div>
              ) : null}

              <div className="inputWithIcon">
                <input
                  type="string"
                  id="aadhar"
                  placeholder="Aadhar Number"
                  name="aadhar"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.aadhar}
                ></input>
              </div>
              {formik.errors.aadhar ? (
                <div className="error">{formik.errors.aadhar}</div>
              ) : null}
            </div>
          ) : null}
          <button type="submit" id="submit" data-testid="signup-button">
            SIGNUP
          </button>
        </form>
      </div>
    </div>
  );
}
export default SignupForm;
