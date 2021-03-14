import React, { useRef, useState } from "react";
import "./Cards.scss";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { deleteItemInCart } from "../../Redux/Actioncreators/Actions";
import { updateSubtotal } from "../../Redux/Actioncreators/SubTotalAction";
import { editItemInCart } from "../../Redux/Actioncreators/Actions";
import { emptySubtotal } from "../../Redux/Actioncreators/SubTotalAction";
import axios from "axios";
function Cards(props) {
  const [isProcess, setProcess] = useState(false);
  const cardref = useRef(null);
  const nameref = useRef(null);
  const expiryref = useRef(null);
  const cvvref = useRef(null);
  let history = useHistory();
  const handleSubmit = () => {
    setProcess(true);

    if (
      cardref.current.value &&
      nameref.current.value &&
      expiryref.current.value &&
      cvvref.current.value
    ) {
    
      if (
        !/^[0-9]/.test(cvvref.current.value) ||
        !/^[0-9]/.test(cardref.current.value) ||
        !/[a-z]/gi.test(nameref.current.value) ||
        !/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(expiryref.current.value)
      ) {
        setProcess(false);
        swal(
          "Invalid Card details",
          "Please check your card details and try again",
          "warning"
        );
      } else {
        axios
          .post(
            "/payment/updateproducts",
            props.data.data.userdata.userCart
          )
          .then()
          .catch((err) => {
            
          });

        axios
          .post("/payment/emptyusercart", {
            email: props.data.data.userdata.userEmail,
          })
          .then()
          .catch((err) => {
            
          });
          var userOrders = [
   
          ];
          for (let [key, value] of Object.entries(props.buyproducts)) {
            if (key !== "produndefined") {
              let obj={};
              console.log(key.slice(4));
              
              obj.productId = key.slice(4);
              obj.productQuantity = value.quantity;
              obj.rating = 0;
              obj.isDelivered = false;
              obj.dateOfOrder = new Date();
              obj.isCancelled = false;
              userOrders.push(obj);
            }
          }
          console.log(userOrders);
          const buyingProducts = {
            userEmail: props.data.data.userdata.userEmail,
            userMobile: props.userdetails.address.mobile,
            userAddress: props.userdetails.address.address,
            userName: props.userdetails.address.name,
            userOrderHistory: userOrders,
          };
          console.log(userOrders);
          axios
            .put("/updateorder", buyingProducts)
            .then((res) => {
              setProcess(false);
             
              if (res.data.message) {
            
                swal(
                  "Order is placed",
                  " Thank you for shopping " +
                    buyingProducts.userName +
                    "! Explore more",
                  "success"
                );
                let email = "";
                let cart = {};
                let products = {};
      
                if (props.user.data && props.user.data.userdata) {
                  email = props.user.data.userdata.userEmail;
                  cart = props.user.data.userdata.userCart;
                  products = props.products;
                }
               
                props.editItem([]);
                props.deleteInSubTotal({})
                
                for (let [key, value] of Object.entries(products)) {
                  let val = "prod" + props.productId;
                  delete products[val];
                }
                history.push("/");
              } else {
                swal(
                  "Order is not placed",
                  "Reason might be your invalid details",
                  "error"
                );
              }
            })
            .catch((err) => {
              setProcess(false);
              swal(
                "Order is not placed",
                "Reason might be your invalid/suspicious details",
                "error"
              );
            });
      }
    } else {
      setProcess(false);
      swal(
        "Empty Card details",
        "Enter all the details of your card and try",
        "warning"
      );
    }
  };
  const handleBuyNow = () => {
    setProcess(true);
    if (
      cardref.current.value &&
      nameref.current.value &&
      expiryref.current.value &&
      cvvref.current.value
    ) {
      if (
        !/^[0-9]/.test(cvvref.current.value) ||
        !/^[0-9]/.test(cardref.current.value) ||
        !/[a-z]/gi.test(nameref.current.value) ||
        !/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(expiryref.current.value)
      ) {
        setProcess(false);
        swal(
          "Order is not placed",
          "Transaction is not successful due to invalid card details",
          "error"
        );
      } else {
        var userOrders = [
          {
            productId: props.userdetails.productId,
            productQuantity: 1,
            rating: 0,
            isDelivered: false,
            dateofOrder: new Date(),
            isCancelled: false,
          },
        ];
        axios 
          .post("/payment/updateproducts", userOrders)
          .then()
          .catch((err) => {
            
          });
        const buyingProducts = {
          userEmail: props.data.data.userdata.userEmail,
          userMobile: props.data.data.userdata.userMobile,
          userAddress: props.data.data.userdata.userAddress,
          userName: props.data.data.userdata.userName,
          userOrderHistory: userOrders,
        };
        axios
          .put("/updateorder", buyingProducts)
          .then((res) => {
            setProcess(false);
            console.log(res.data.message);
            if (res.data.message) {
              const min = 11111111;
              const max = 111111111111111;
              const transactionId = min + Math.random() * (max - min);
              swal(
                "Order is placed",
                "Transaction id:" + transactionId,
                "success"
              );
              history.push("/");
            } else {
              swal(
                "Order is not placed",
                "Transaction is not succesfull due to some unexpected reason",
                "warning"
              );
            }
          })
          .catch((err) => {
            setProcess(false);
            swal(
              "Order is not placed",
              "Transaction is not succesfull due to some unexpected reason",
              "warning"
            );
          });
      }
    } else {
      setProcess(false);
      swal(
        "Empty Card details",
        "Enter all the details of your card and try",
        "warning"
      );
    }
  };
  return (
    <div className="card_details">
      <h5>CREDIT/DEBIT CARD</h5>
      <div className="each_detail">
        <input
          className="card_input"
          ref={cardref}
          placeholder="Card Number"
          name="card_number"
        ></input>
        <CreditCardIcon style={{ width: "2em" }}></CreditCardIcon>
      </div>
      <div className="each_detail">
        <input
          className="card_input"
          ref={nameref}
          placeholder="Name on card"
          name="card_name"
        ></input>
        <AccountBoxIcon style={{ width: "2em" }}></AccountBoxIcon>
      </div>
      <div className="expiry_cvv">
        <div className="expiry">
          <input
            className="card_input"
            placeholder="Valid Thru"
            ref={expiryref}
            name="card_expiry"
            // type="month"
          ></input>
        </div>
        <div className="cvv">
          <input
            className="card_input"
            placeholder="CVV"
            ref={cvvref}
            name="card_cvvc"
          ></input>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        id="sub_button"
        onClick={() => {
          {
            props.userdetails.address ? handleSubmit() : handleBuyNow();
          }
        }}
      >
        PAY NOW
      </button>
      {isProcess ? (
        <CircularProgress
          style={{ marginLeft: "44%", color: "orange", marginTop: "2%" }}
        ></CircularProgress>
      ) : null}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    data: state.signin.data,
    buyproducts: state.subTotal,
    user: state.signin.data,
    products: state.subTotal,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    deleteItem: (obj) => dispatch(deleteItemInCart(obj)),
    makeSubTotalEmpty: () => dispatch(emptySubtotal()),
    editItem: (obj) => dispatch(editItemInCart(obj)),
    deleteInSubTotal: (obj) => dispatch(updateSubtotal(obj)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Cards);
