import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import {  Button } from 'react-bootstrap';
function CancelButton(props) {
    let responseData = {};
    let email=props.email;
    let order=props.data;
   

    const [productIsPresent, setProductIsPresent] = useState(false);
   
    const cancelHandler=(order)=>
    {
       
      
     const canceledObject =
     {
       productId: order.productId,
       productQuantity: order.productQuantity
     }
 
     const isCancelledObject = {
       email: email,
      orderId: order._id
     }
 
     if (window.confirm("Do you really want to cancel this order?")) {
     
       axios.patch('/orderCancelUpdateQuantity', canceledObject)
         .then()
         .catch()
 
       axios.patch('/orderCancelled', isCancelledObject)
         .then(res => {
           setProductIsPresent(true);
           responseData = res.data.data;
 
        //    props.updateOrderData(responseData);
        //    props.UpdateOrderDataInSigninData(responseData.userOrderHistory);
           swal("Order cancelled successfully",'Thank You');
         })
     }
     else {
        swal("Ok Thanks!");
     }
     
   }
    return (
        <div >
            {!productIsPresent?<div style={{paddingBottom:"1%"}}>Status:Pending</div>:null}
            
            {!productIsPresent ? (
                <Button className='card-btn' onClick={() => cancelHandler(order)}> Cancel Order</Button >
            ) : (
                   <p>Product Cancelled</p>
                )}
        </div>
    );
}
export default CancelButton;
