import React, { useState } from "react";
import "./Payment.scss";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import SecurityIcon from "@material-ui/icons/Security";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import Cards from "./Cards";
import Cod from "./Cod";
import Upi from "./Upi";
import { connect } from "react-redux";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

function Payment(props) {
  console.log(props.location);
  console.log(props.productDetails.productData);

  const [payMode, setPaymode] = useState(1);
  const handleChange = (payNum) => {
    if (payNum === 1) {
      document.getElementById("card").style.backgroundColor = "white";
    } else {
      document.getElementById("card").style.backgroundColor = "";
    }
    if (payNum === 2) {
      document.getElementById("cash").style.backgroundColor = "white";
    } else {
      document.getElementById("cash").style.backgroundColor = "";
    }
    if (payNum === 3) {
      document.getElementById("upi").style.backgroundColor = "white";
    } else {
      document.getElementById("upi").style.backgroundColor = "";
    }
    setPaymode(payNum);
  };
  function handleHelp() {
    document.querySelector("label").textContent =
      "SECURE:- YOUR CARD DETAILS WILL NOT BE SHARED WITH ANYONE.  VOCAL FOR LOCAL SECURES YOUR PAYMENT AND DETAILS";
  }

  return (
    <div className="pay_container">
      <div style={{ display: "flex" }}>
        <label
          className="help_head"
          style={{
            fontSize: "10px",
            fontFamily: "serif",
            width: "50%",
            margin: "auto",
            color: "black",
          }}
        ></label>
        <LiveHelpIcon
          onClick={handleHelp}
          className="help_icon"
          style={{}}
        ></LiveHelpIcon>
      </div>

      <h5
        style={{
          fontWeight: "bold",
          marginLeft: "3%",
          marginBottom: "1%",
          marginTop: "0.5%",
          color: "black",
        }}
      >
        Choose Payment Mode
      </h5>
      <div className="pay">
        <div className="pay_methods">
          <div className="pay_types">
            <div className="all_types">
              <div
                className="each_type"
                id="card"
                onClick={() => {
                  handleChange(1);
                }}
              >
                <CreditCardIcon style={{ width: "2em" }}></CreditCardIcon>
                <label
                  style={{ fontWeight: "bold", marginTop: "1%" }}
                  id="card_label"
                >
                  CREDIT/DEBIT CARD
                </label>
              </div>
              <div
                className="each_type"
                id="cash"
                onClick={() => {
                  handleChange(2);
                }}
              >
                <LocalAtmIcon style={{ width: "2em" }}></LocalAtmIcon>
                <label
                  style={{ fontWeight: "bold", marginTop: "1%" }}
                  id="cash_label"
                >
                  CASH ON DELIVERY
                </label>
              </div>
              <div
                className="each_type"
                id="upi"
                onClick={() => {
                  handleChange(3);
                }}
              >
                <CreditCardIcon style={{ width: "2em" }}></CreditCardIcon>
                <label
                  style={{ fontWeight: "bold", marginTop: "1%" }}
                  id="upi_label"
                >
                  UPI PAY
                </label>
              </div>
              <div className="security">
                <SecurityIcon
                  style={{ width: "2em", marginLeft: "5%" }}
                ></SecurityIcon>
                <label
                  style={{
                    fontWeight: "bold",
                    marginTop: "3%",
                    color: "green",
                  }}
                >
                  100% SECURE
                </label>
              </div>
            </div>
          </div>
          {props.location && props.location.data ? (
            <div className="pay_details">
              {payMode === 1 ? (
                <Cards userdetails={props.location.data}></Cards>
              ) : null}
              {payMode === 2 ? (
                <Cod userdetails={props.location.data}></Cod>
              ) : null}
              {payMode === 3 ? (
                <Upi userdetails={props.location.data}></Upi>
              ) : null}
            </div>
          ) : (
            <div className="pay_details">
              {payMode === 1 ? (
                <Cards userdetails={props.productDetails.productData}></Cards>
              ) : null}
              {payMode === 2 ? (
                <Cod userdetails={props.productDetails.productData}></Cod>
              ) : null}
              {payMode === 3 ? (
                <Upi userdetails={props.productDetails.productData}></Upi>
              ) : null}
            </div>
          )}
        </div>
        <div className="pay_price">
          <h5>PRICE SUMMARY</h5>
          <div className="pay_mrp" style={{ marginTop: "1%" }}>
            <label>Total MRP</label>
            {props.location && props.location.data ? (
              <p>Rs {props.location.data.actual}</p>
            ) : (
              <p>Rs {props.productDetails.productData.productTotal}</p>
            )}
          </div>
          <div className="pay_discount" style={{ marginTop: "1%" }}>
            <label>Discount on MRP</label>
            {props.location && props.location.data ? (
              <p>Rs {props.location.data.discount}</p>
            ) : (
              <p>Rs 0</p>
            )}
          </div>

          <div className="pay_fee" style={{ marginTop: "1%" }}>
            <label>Handling Fee</label>
            <p>
              {props.location && props.location.data ? (
                <p>Rs {props.location.data.shipping}</p>
              ) : (
                <p>Rs 50</p>
              )}
            </p>
          </div>

          <div className="pay_final" style={{ marginTop: "1%" }}>
            <label style={{ fontWeight: "bold" }}>Total Amount</label>
            <p style={{ fontWeight: "bold" }}>
              {props.location && props.location.data ? (
                <p>Rs {props.location.data.total}</p>
              ) : (
                <p>Rs {props.productDetails.productData.productTotal + 50}</p>
              )}
            </p>
          </div>
          <div className="address">
            <label style={{ fontWeight: "normal", fontWeight: "bold" }}>
              Order deliver to
            </label>

            <div
              style={{
                fontSize: "15px",
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <div className="name" style={{ marginRight: "30%" }}>
                <label>Address</label>
              </div>
              <div>{props.user.data && props.user.data.userdata.userName},</div>

              <div>
                {props.user.data && props.user.data.userdata.userAddress},
              </div>
              <div>
                {props.user.data && props.user.data.userdata.userMobile}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="secure_tag">
        <div
          className="text1"
          style={{ fontWeight: "bold", fontFamily: "serif" }}
        >
          100% Secure Payment
        </div>
        <div className="text2">vocalforlocal</div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    productDetails: state.productInfo,
    user: state.signin.data,
    buyproducts: state.subTotal,
  };
}

export default connect(mapStateToProps)(Payment);
