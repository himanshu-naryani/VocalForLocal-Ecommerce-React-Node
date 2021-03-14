import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AddToCartButton from "../../Shared/ButtonComponents/AddToCartButton";
import GoToCartButton from "../../Shared/ButtonComponents/GoToCartButton";
import { useHistory } from "react-router-dom";
import { addItemInCart } from "../../Redux/Actioncreators/Actions";
import axios from "axios";

function AddToCart(props) {
  const id = props.productId;
  const quant = props.quantity;

  const [productIsPresent, setProductIsPresent] = useState(false);
  const [status, setStatus] = useState(false);
  const history = useHistory();
  let cart = [];
  let email = "";
  if (props.user.data && props.user.data.userdata) {
    cart = props.user.data.userdata.userCart;
    email = props.user.data.userdata.userEmail;
  }

  useEffect(() => {
    if (cart.length > 0) {
      cart.map((item) => {
        if (item && item.productId === id) setProductIsPresent(true);
      });
    }
  }, [cart]);

  const goToCart = () => {
    history.push("/cart");
  };

  const postObject = {
    userEmail: email,
    product: {
      productId: props.productId,
      productQuantity: props.quantity,
    },
  };
  const addToCart = () => {
    if (!email) history.push("/signin");
    if (!status) {
      setStatus(true);
      axios
        .post("/cart/addproduct", postObject)
        .then((res) => {
          cart.push({
            productId: props.productId,
            productQuantity: props.quantity,
          });
          props.addItem(cart);

          setProductIsPresent(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div style={{ width: "45%" }}>
      {!productIsPresent ? (
        <AddToCartButton onClick={() => addToCart()} />
      ) : (
        <GoToCartButton onClick={() => goToCart()} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.signin.data,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (obj) => dispatch(addItemInCart(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
