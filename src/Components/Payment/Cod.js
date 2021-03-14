import React, { useState } from "react";
import "./Cod.scss";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { deleteItemInCart } from "../../Redux/Actioncreators/Actions";
import { updateSubtotal } from "../../Redux/Actioncreators/SubTotalAction";
import { editItemInCart } from "../../Redux/Actioncreators/Actions";
import swal from "sweetalert";
import { emptySubtotal } from "../../Redux/Actioncreators/SubTotalAction";
function Cod(props) {
  let history = useHistory();
  const [isProcess, setProcess] = useState(false);

  const handleSubmit = () => {
   
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


    setProcess(true);
   
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
  };
  const handleBuyNow = () => {
    
    setProcess(true);
    var userOrders = [
      {
        productId: props.userdetails.productId,
        productQuantity: 1,
        rating: 0,
        isDelivered: false,
        dateofOrder: 0,
        isCancelled: false,
      },
    ];
    userOrders[0].dateOfOrder=new Date();
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
        // console.log(res.data.message);
        console.log("look buynow")
        if (res.data.message) {
          swal(
            "Order is placed",
            " Thanks for shopping " +
            buyingProducts.userName +
            "! Explore more",
            "success"
          );
          history.push("/");
        } else {
          swal(
            "Order is not placed",
            "Not succesfull due to some unexpected reason",
            "error"
          );
        }
      })
      .catch((err) => {
        setProcess(false);
        swal(
          "Order is not placed",
          "Not succesfull due to some unexpected reason",
          "error"
        );
      });
  };
  return (
    <div className="cash_delivery">
      <h5>CASH ON DELIVERY</h5>
      <div className="text">
        <div>
          Congratulations! Pay on delivery is avaliable for this product.You can
          pay the amount after the product is deleivered
        </div>
        <br></br>
        <div>Enjoy the shopping!</div>
      </div>
      <button
        className="btn btn-primary"
        style={{ width: "96%", marginLeft: "2%", fontWeight: "bold" }}
        onClick={() => {
          {
            props.userdetails.address ? handleSubmit() : handleBuyNow();
          }
        }}
      >
        PLACE ORDER
      </button>
      {isProcess ? (
        <CircularProgress
          style={{ marginLeft: "47%", color: "orange", marginTop: "2%" }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Cod);
