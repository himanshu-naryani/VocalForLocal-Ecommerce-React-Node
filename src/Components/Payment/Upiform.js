import React, { useRef,useState } from "react";
import "./Upi.scss";
import {connect} from 'react-redux'
import swal from "sweetalert";
import axios from 'axios';
import CircularProgress from "@material-ui/core/CircularProgress";
import {useHistory} from 'react-router-dom'
import {emptySubtotal} from '../../Redux/Actioncreators/SubTotalAction';
import { deleteItemInCart } from "../../Redux/Actioncreators/Actions";
import { updateSubtotal } from "../../Redux/Actioncreators/SubTotalAction";
import { editItemInCart } from "../../Redux/Actioncreators/Actions";
function Upiform(props) {
  const upiref=useRef(null);
  let history=useHistory();
  const [isProcess, setProcess] = useState(false);
  const handleSubmit = () => {
    setProcess(true);

    axios               
    .post('/payment/updateproducts', props.data.data.userdata.userCart)
    .then()                    
    .catch((err)=>{
      
    })

    axios    
    .post('/payment/emptyusercart',{email:props.data.data.userdata.userEmail})
    .then()
    .catch((err)=>{
      
    })
    
 
    if (
      !upiref.current.value || !(/^\w+@\w+/.test(upiref.current.value))
    
    ) {
      setProcess(false);
      
      swal("Order is not placed","Transaction is not succesful due to invalid UPI ID","error");
      
    } 
      else {
        
        var userOrders = [
   
        ];
        for (let [key, value] of Object.entries(props.buyproducts)) {
          if (key !== "produndefined") {
            let obj={};
          
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
              const min = 11111111;
              const max = 111111111111111;
              const transactionId = min + Math.random() * (max - min);
              swal(
                "Order is placed",
                "Upi transaction: "+transactionId,
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
  };
  const handleBuyNow = () => {
    setProcess(true);
    if (
      !upiref.current.value || !(/^\w+@\w+/.test(upiref.current.value))
    ) {
    
      setProcess(false);
      swal(
        "Order is not placed",
        "Transaction is not successful due to invalid Upi details",
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
      .post(
        "/payment/updateproducts",userOrders
        
      )
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
         
          if (res.data.message) {
            const min = 11111111;
            const max = 111111111111111;
            const transactionId = min + Math.random() * (max - min);
            swal(
              "Order is placed",
              "UPI Transaction id:" + transactionId,
              "success"
            );
            history.push("/");
          } else {
            swal(
              "Order is not placed",
              "Transaction is not succesfull due to some unexpected reason",
              "error"
            );
          }
        })
        .catch((err) => {
          setProcess(false);
          swal(
            "Order is not placed",
            "Transaction is not succesfull due to some unexpected reason",
            "error"
          );
        });
    }
  };
  return (
    <div className="upiform">
     
      <input
        className="upi_Id"
        placeholder="Enter UPI ID here "
        required
       
        ref={upiref}
      ></input>
        
      <button
        className="btn btn-primary"
        type="submit"
        style={{
          width: "100%",
          marginTop: "4%",
          marginBottom: "3%",
          fontWeight: "bold",
        }}
        onClick={() => {
          {
            props.userdetails.address ? handleSubmit() : handleBuyNow();
          }
        }}
      >
        UPI PAY
      </button>
      {isProcess ? (
        <CircularProgress
          style={{ marginLeft: "45%", color: "orange",marginBottom:"0.5%" }}
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


export default connect(mapStateToProps,mapDispatchToProps)(Upiform);
