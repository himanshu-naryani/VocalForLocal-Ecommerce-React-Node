import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CartItem from "./CartItem";
import CardDeck from "react-bootstrap/CardDeck";
import EmptyCart from "../../SVG/EmptyCart";
import Address from "./Address";
import "./Cart.scss";
import Checkout from "./Checkout";
import { emptySubtotal } from "../../Redux/Actioncreators/SubTotalAction";

function Cart(props) {
  const [address, setAddress] = useState({});
  let user = {};
  const history = useHistory();
  if (props.user.data && props.user.data.userdata) {
    user = props.user.data.userdata;
  }
  if (Object.keys(user).length === 0 && user.constructor === Object) {
    if (history) history.push("/signin");
    return null;
  }
  let cartItems = [];

  if (user && user.userCart.length != undefined) {
    cartItems =
      user &&
      user.userCart.map((item) => {
        return <CartItem key={item.productId} product={item} />;
      });
  }

  let subTotal = 0;
  for (let [key, value] of Object.entries(props.totalPrice)) {
    if (key.slice(0, 4) === "prod" && key !== "produndefined")
      subTotal += value.quantity * value.price;
  }

  return (
    <div className="maindiv-cart">
      {Object.keys(user).length !== 0 && (
        <div>
          <p className="header-cart">SHOPPING CART</p>
          <Divider
            className="divider-cart"
            style={{
              width: "70%",
              margin: "auto",
              backgroundColor: "white",
              height: "2px",
            }}
          />
        </div>
      )}
      {Object.keys(user).length !== 0 && (
        <Box display={{ xs: "none", sm: "none", md: "block", lg: "block" }}>
          <Grid container style={{ width: "70%", margin: "auto" }}>
            <Grid item sm={6}>
              <p className="subheader-cart">Product</p>
              <Divider
                className="divider-cart"
                style={{ backgroundColor: "white", height: "2px" }}
              />
            </Grid>

            <Grid item sm={2}>
              <Grid style={{ width: "40%", margin: "auto" }}>
                <p className="subheaderprice-cart">Price</p>
                <Divider style={{ backgroundColor: "white", height: "2px" }} />
              </Grid>
            </Grid>

            <Grid item sm={2}>
              <Grid style={{ width: "40%", margin: "auto" }}>
                <p className="subheaderprice-cart">Quantity</p>
                <Divider style={{ backgroundColor: "white", height: "2px" }} />
              </Grid>
            </Grid>

            <Grid item sm={2}>
              <Grid style={{ width: "40%", margin: "auto" }}>
                <p className="subheaderprice-cart">Total</p>
                <Divider style={{ backgroundColor: "white", height: "2px" }} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}

      <div style={{ width: "70%", margin: "auto" }}>
        <CardDeck style={{ display: "flex", flexDirection: "column" }}>
          {cartItems}
        </CardDeck>
        {cartItems.length === 0 && <EmptyCart />}
      </div>

      <Divider
        style={{
          width: "70%",
          margin: "auto",
          backgroundColor: "white",
          height: "3px",
          marginTop: "1%",
          marginBottom: "2%",
        }}
      />
      {cartItems.length > 0 && (
        <Grid container>
          <Grid item xs={11} sm={11} md={6}>
            <Address data={(data) => setAddress(data)} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Checkout
              address={address}
              amount={subTotal}
              items={props.totalPrice}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.signin.data,
  totalPrice: state.subTotal,
});

const mapDispatchToProps = (dispatch) => ({
  makeSubTotalEmpty: () => dispatch(emptySubtotal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
