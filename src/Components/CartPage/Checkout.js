import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { SHIPPING_FEE } from "../Constants/ProjectConstants";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import CancelIcon from "@material-ui/icons/Cancel";
import SlideEffectButton from "../../Shared/ButtonComponents/SlideEffectButton";
import SuccessSnackBar from "../../Shared/SnackBars/SuccessSnackBar";
import { useHistory } from "react-router-dom";
import CartError from "./CartError";
import axios from "axios";
import "./Cart.scss";

const styles = {
  input1: {
    height: 0.1,
    fontSize: "8pt",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "black",
      fontSize: "9pt",
      float: "left",
      fontWeight: "400",
    },
  },
};

function Checkout(props) {

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const [estimatedTotal, setEstimatedTotal] = useState(
    props.amount + SHIPPING_FEE
  );
  const [checkOutButton, setCheckOutButton] = useState(false);
  const [errorOcured, setErrorOccured] = useState(false);
  const [snackBar, showSnackBar] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setEstimatedTotal(props.amount + SHIPPING_FEE);
  }, [props.amount]);

  const checkCoupon = () => {
    showSnackBar(false);
    let flag = 0;
    if (!couponApplied) {
      axios
        .post("/promo/check", { promoCode: couponCode })
        .then((res) => {
          setCouponApplied(true);
          setCouponCode("");
          setEstimatedTotal(estimatedTotal - res.data.amount);
          setDiscount(res.data.amount);
          flag = 1;
        })
        .catch((err) => {
          console.log("fail");
          console.log(err);
          showSnackBar(true);
          setCouponCode("");
        });
    }
  };

  const cancelDiscount = () => {
    setCouponApplied(false);
    setEstimatedTotal(estimatedTotal + discount);
    setDiscount(0);
    setCouponCode("");
  };

  const checkCart = () => {
    for (let [key, value] of Object.entries(props.items)) {
      if (key.slice(0, 4) === "prod" && key !== "produndefined")
        if (value.quantity > value.available) {
          setErrorOccured(true);
          return;
        }
    }
    history.push({
      pathname: "/payment",
      data: {
        address: props.address,
        total: estimatedTotal,
        actual: estimatedTotal + discount - SHIPPING_FEE,
        shipping: SHIPPING_FEE,
        discount: discount,
      },
    });
  };

  return (
    <div className="maindiv-checkout">
      <Grid container spacing={1}>
        <Grid item xs={1}></Grid>
        <Grid item xs={4} className="item-heading-checkout">
          SubTotal
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          &#8377; {props.amount}
        </Grid>
        <Grid item xs={3}></Grid>

        <Grid item xs={1}></Grid>
        <Grid item xs={4} className="item-heading-checkout">
          Shipping Fee
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3} className="item-value-checkout">
          &#8377; {SHIPPING_FEE}
        </Grid>
        <Grid item xs={3}></Grid>

        <Grid item xs={1}></Grid>
        {!couponApplied ? (
          <Grid
            item
            xs={4}
            className="item-heading-checkout"
            style={{ paddingTop: "2.5%" }}
          >
            Promocode
          </Grid>
        ) : (
            <Grid item xs={4} className="item-heading-checkout">
              Savings
            </Grid>
          )}
        <Grid item xs={1}></Grid>
        <Grid item xs={6} className="item-value-checkout">
          {!couponApplied ? (
            <TextField
              style={{
                width: "90%",
                marginLeft: "2%",
                marginRight: "2%",
                marginTop: "5%",
              }}
              placeholder="Have Coupon?"
              value={couponCode}
              onChange={(event) => {
                setCouponCode(event.target.value.trim().toUpperCase());
                showSnackBar(false);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && checkCoupon();
              }}
              InputProps={{
                classes: { input: props.classes.input1 },
                endAdornment: (
                  <InputAdornment style={{ textDecoration: "none" }}>
                    <CheckBoxOutlinedIcon
                      className="inputadornment-checkout"
                      style={{ fontSize: "20", float: "right", fill: "green" }}
                      onClick={checkCoupon}
                    />
                  </InputAdornment>
                ),
              }}
            />
          ) : (
              <div>
                <Grid
                  item
                  xs={6}
                  className="item-value-checkout"
                  style={{ color: "red" }}
                >
                  &#8377; {discount}{" "}
                  <CancelIcon
                    onClick={cancelDiscount}
                    style={{ float: "right", fontSize: "14pt" }}
                  />
                </Grid>
              </div>
            )}
        </Grid>
      </Grid>
      <div style={{ marginTop: "1vw" }}>
        {!checkOutButton ? (
          <div>
            <Grid container>
              <Grid
                item
                onMouseEnter={() => setCheckOutButton(true)}
                style={{ margin: "2% auto" }}
              >
                <SlideEffectButton
                  color="green"
                  buttonName={"Pay Rs. " + estimatedTotal}
                />
              </Grid>
            </Grid>
          </div>
        ) : (
            <div>
              <Grid container>
                <Grid
                  item
                  onMouseLeave={() => setCheckOutButton(false)}
                  onClick={checkCart}
                  style={{ margin: "2% auto" }}
                >
                  <SlideEffectButton color="green" buttonName={"Checkout"} />
                </Grid>
              </Grid>
            </div>
          )}
      </div>

      {errorOcured && (
        <CartError errorClickHandler={() => setErrorOccured(false)} />
      )}
      {snackBar && (
        <SuccessSnackBar
          message="The coupon is either Invalid or Expired"
          severity="warning"
        />
      )}
    </div>
  );
}

export default withStyles(styles)(Checkout);
