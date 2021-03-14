import React from 'react';
import { useState, useEffect } from "react";

import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import OrderHistory from './OrderHistory';
import Rating from './RatingUser/Rating';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { updateOrderDataAction } from '../../Redux/Actioncreators/UpdateOrderCancelActions';
import { updateOrderHistory } from '../../Redux/Actioncreators/Actions';

import './ordertabled.scss';
import EmptyOrder from '../../SVG/order/EmptyOrder';
import CircularProgress from "@material-ui/core/CircularProgress";
import CancelButton from './RatingUser/CancelButton';
const axios = require('axios');

const OrderTable = (props) => {
  let user = {}

  const history = useHistory()
  let userEmail = props.user.data.userdata.userEmail

  console.log(props.user.data.userdata);

  let today = new Date();

  const [loading, setLoading] = useState(true);
  const [order, setorder] = useState({})
  useEffect(() => {
    axios.get('/getOrder/' + userEmail)
      .then((response) => {
        setLoading(false);
        let res = response.data[0].userOrderHistory
        setorder(response.data[0].userOrderHistory)
        res.map((res) => {
          let isdeliveredObject = {
            email: userEmail,
            id: res._id

          }
          {
            ((((Math.abs(today.getTime() - new Date(res.dateOfOrder).getTime()) / (1000)) / 86400)) > 3)
              &&
              axios.patch("/updateDelivery/", isdeliveredObject)
                .then(res => { })
                .catch()
          }
        })

      })

      .catch()
    setLoading(false)

  }, [])

  if (props.user.data && props.user.data.userdata)
    user = props.user.data.userdata
  if (Object.keys(user).length === 0 && user.constructor === Object) { history.push('/signin'); return null }

  return (

    <div className="ordertable">

      <div >

        <p className="header-order" >Order History</p>
        <Divider style={{ width: "90%", margin: "auto", backgroundColor: "#FBAF00", padding: "1px" }} />
      </div>


      <Box display={{ xs: "none", sm: "none", md: "block", lg: "block" }}>
        <Grid container style={{ width: '90%', margin: "auto" }}>
          <Grid sm={6} >
            <p className="subheader-order">Product</p>
            <Divider style={{ backgroundColor: "black", width: "50%", paddingRight: "30%", paddingBottom: "1px", backgroundColor: "#FBAF00" }} />
          </Grid>

          <Grid sm={2} >
            <Grid style={{ width: '40%', margin: "auto" }}>
              <p className="subheaderprice-order">Price</p>
              <Divider style={{ backgroundColor: "#FBAF00", padding: "1px" }} />
            </Grid>
          </Grid>

          <Grid sm={2} >
            <Grid style={{ width: '40%', margin: "auto" }}>
              <p className="subheaderprice-order">Quantity</p>
              <Divider style={{ backgroundColor: "#FBAF00", padding: "1px" }} />
            </Grid>
          </Grid>

          <Grid sm={2} >
            <Grid style={{ width: '40%', margin: "auto" }}>
              <p className="subheaderprice-order">Total</p>
              <Divider style={{ backgroundColor: "#FBAF00", padding: "1px" }} />
            </Grid>
          </Grid>

        </Grid>

      </Box>
      {(order.length > 0 && loading === false) &&
        (<div  >
          <div style={{ marginLeft: "5%", marginRight: "5%", marginBottom: "2%" }}>

            {order.map((order) => (

              (order != undefined) ?
                <div className="contain">
                  <div>
                    <OrderHistory key={order.productId} product={order} />
                    <div className="function-block">
                      <div style={{ margin: "0% 0% 0% 50%" }}> Order Placed on {order.dateOfOrder.slice(0, 10)}</div>

                      <div style={{ margin: "0% 0% 0% 50%" }}>


                      </div>
                      <div style={{ margin: "0% 0% 1% 50%" }}>
                        {((((Math.abs(today.getTime() - new Date(order.dateOfOrder).getTime()) / (1000)) / 86400)) > 3) ? (<Rating data={order} />)
                          : !order.isCancelled ? <CancelButton data={order} email={userEmail} /> : <div>Product Cancelled</div>}</div></div>
                  </div>
                </div>

                : null

            ))}

          </div>
        </div >
        )}
      {
        (order.length === 0 && loading === true) && <CircularProgress style={{ marginLeft: "47%", color: "blue", marginTop: "2%" }}></CircularProgress>
      }
      {
        (order.length === 0 && loading === false) && <EmptyOrder />
      }

    </div>
  )
};
const mapStateToProps = (state) => ({
  user: state.signin.data,
  updated: state.updateOrder
});
const mapDispatchToProps = (dispatch) => {
  return {

    //Updating redux store for states >> SignIn and UpdateOrder
    updateOrderData: (updatedOrderData) => dispatch(updateOrderDataAction(updatedOrderData)),
    UpdateOrderDataInSigninData: (updatedOrderData) => dispatch(updateOrderHistory(updatedOrderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTable);

