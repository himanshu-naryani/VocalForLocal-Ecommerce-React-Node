import React, { useState } from 'react'
import './buyNow.scss'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendProductDataForPayment } from '../../Redux/Actioncreators/ProductInfoActions';
import AddToCart from '../CartPage/AddToCart'
import queryString from 'query-string';

let productid = "";

let isUserSignedIn = false;
let isProductDataAvailable = false;

function BuyNow(props) {
    const history = useHistory();


    let urlParams = queryString.parse(window.location.search);


    productid = urlParams.value;

    ((Object.keys(props.userData).length) > 1) ? isUserSignedIn = true : isUserSignedIn = false


    function handleClickBuyNow() {


        { (props.productData == null || props.productData[0] == null) ? isProductDataAvailable = false : isProductDataAvailable = true }


        if (isUserSignedIn && isProductDataAvailable) {

            let productDataForPayment = {
                productId: props.productData[0].productId,
                productName: props.productData[0].productName,
                productPrice: props.productData[0].productPrice,
                productQuantity: props.quantitySelected,
                productTotal: props.quantitySelected * props.productData[0].productPrice

            }

            props.sendProductDataForPayment(productDataForPayment);
            history.push('/payment');
        }
        else {

            history.push('/Signin');
        }
    }

    return (
        <div className='div-buyNow' id="div-buyNow">
            <AddToCart className='btn-addToCart'
                productId={productid}
                quantity={props.quantitySelected}
            />
            <Button className='btn-buyNow' onClick={handleClickBuyNow}>Buy now</Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state.signin.data && state.signin.data.data)

        return ({

            userData: state.signin.data.data.userdata,
            quantitySelected: state.productInfo.quantity

        })
    return ({
        userData: state.signin.data,// data is an object
        quantitySelected: state.productInfo.quantity
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendProductDataForPayment: (productData) => dispatch(sendProductDataForPayment(productData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyNow);