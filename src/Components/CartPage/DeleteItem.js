import React from "react";
import { connect } from "react-redux";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import axios from "axios";
import { deleteItemInCart } from "../../Redux/Actioncreators/Actions";
import { updateSubtotal } from "../../Redux/Actioncreators/SubTotalAction";
import { editItemInCart } from "../../Redux/Actioncreators/Actions";

function DeleteItem(props) {
  let email = "";
  let cart = {};
  let products = {};

  if (props.user.data && props.user.data.userdata) {
    email = props.user.data.userdata.userEmail;
    cart = props.user.data.userdata.userCart;
    products = props.products;
  }

  const deleteHandler = () => {
    axios
      .post("/cart/removeproduct", {
        userEmail: email,
        productId: props.productId,
      })
      .then((res) => {
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].productId === props.productId) {
            cart[i].productQuantity = 0;
            break;
          }
        }
        props.editItem(cart);

        for (let i = 0; i < cart.length; i++) {
          if (cart[i].productId === props.productId) {
            cart.splice(i, 1);
            break;
          }
        }

        props.deleteItem(cart);

        for (let [key, value] of Object.entries(products)) {
          if (key.slice(0, 4) === "prod" && key !== "produndefined") {
            let val = "prod" + props.productId;
            if (val === key) delete products[val];
          }
        }
        props.deleteInSubTotal(products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <RemoveCircleOutlineIcon
      className="deleteicon-cart"
      style={{ fill: "red" }}
      onClick={deleteHandler}
      data-testid="delete-button"
    />
  );
}

const mapStateToProps = (state) => ({
  user: state.signin.data,
  products: state.subTotal,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (obj) => dispatch(deleteItemInCart(obj)),
  editItem: (obj) => dispatch(editItemInCart(obj)),
  deleteInSubTotal: (obj) => dispatch(updateSubtotal(obj)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DeleteItem);
