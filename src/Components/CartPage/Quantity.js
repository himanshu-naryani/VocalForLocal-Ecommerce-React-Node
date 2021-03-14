import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { editItemInCart } from "../../Redux/Actioncreators/Actions";
import { MAX_QUANTITY_FOR_BUYING } from "../Constants/ProjectConstants";

function Quantity(props) {
  const [quantity, setQuantity] = useState(props.quantity);
  const [loading, setLoading] = useState(false);

  let email = "";
  let cart = {};

  if (props.user.data && props.user.data.userdata) {
    email = props.user.data.userdata.userEmail;
    cart = props.user.data.userdata.userCart;
  }

  const changeHandler = (event) => {
    setLoading(true);
    if (isNaN(event.target.value)) {
      event.target.value = quantity;
      setLoading(false);
      return;
    }
    event.target.value =
      event.target.value <= 0
        ? (event.target.value = 1)
        : event.target.value > 20
        ? 20
        : event.target.value;
    setQuantity(event.target.value);

    const editObj = {
      userEmail: email,
      product: {
        productId: props.productId,
        productQuantity: event.target.value,
      },
    };

    axios
      .post("/cart/addproduct", editObj)
      .then((response) => {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].productId === props.productId) {
            cart[i].productQuantity = event.target.value;
            break;
          }
        }
        props.editItem(cart);

        setLoading(false);
      })
      .catch((err) => {
        console.log("Unable to edit the quantity at this moment" + err);
        setLoading(false);
      });
  };

  return (
    <div>
      <TextField
        onChange={changeHandler}
        name="price"
        style={{ width: "35px", marginLeft: "15%" }}
        id="quantity"
        defaultValue={quantity}
        type="number"
        InputProps={{ inputProps: { min: 1, max: MAX_QUANTITY_FOR_BUYING } }}
        error={parseInt(quantity) > props.available}
        helperText={
          parseInt(quantity) > props.available ? (
            <strong>Not Available</strong>
          ) : null
        }
      />
      {false && loading && (
        <TextField
          onChange={changeHandler}
          name="price"
          style={{ width: "35px", marginLeft: "15%" }}
          id="quantity"
          defaultValue={quantity}
          type="number"
          InputProps={{ inputProps: { min: 1, max: MAX_QUANTITY_FOR_BUYING } }}
          helperText={quantity < 1 ? "Min value 1" : ""}
          disabled
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.signin.data,
});

const mapDispatchToProps = (dispatch) => ({
  editItem: (obj) => dispatch(editItemInCart(obj)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Quantity);
