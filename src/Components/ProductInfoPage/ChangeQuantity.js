import { Button } from 'react-bootstrap'
import React, { useEffect } from 'react'
import './changeQuantity.scss'
import { connect } from 'react-redux'
import { incrementQuantity, decrementQuantity } from '../../Redux/Actioncreators/ProductInfoActions';

let resetOnce = false;
let isPageLoaded = false;

function ChangeQuantity(props) {


    useEffect(() => {
        let errorMsgDiv = document.getElementById('div-errorMsg');

        if (!resetOnce) {
            errorMsgDiv.innerHTML = ""
            props.increment(0);
            resetOnce = true;
        }

        isPageLoaded = true;
    }, [])


    function decreaseQuantity(quantitySelected) {

        if (quantitySelected > 1 && isPageLoaded) {
            let errorMsgDiv = document.getElementById('div-errorMsg');
            errorMsgDiv.innerHTML = ""
            props.decrement(quantitySelected)
        }
        else {
            let errorMsgDiv = document.getElementById('div-errorMsg');
            errorMsgDiv.innerHTML = "Quantity cannot be less than 1"
        }
    }


    function increaseQuantity(quantitySelected, quantityAvailable, resetOnce) {



        if (quantitySelected < quantityAvailable && isPageLoaded) {
            let errorMsgDiv = document.getElementById('div-errorMsg');
            errorMsgDiv.innerHTML = ""
            props.increment(quantitySelected)
        }
        else {
            let errorMsgDiv = document.getElementById('div-errorMsg');
            errorMsgDiv.innerHTML = "Quantity unavailable"
        }
    }



    return (
        <div id="div-quantityContainer">
            <div>
                <header id='heading-quantity'>Quantity</header>
            </div>
            <div id='div-changeQuantity'>
                <Button className="btn-quantity"
                    onClick={() =>
                        decreaseQuantity(props.quantitySelected)
                    }
                >-</Button>
                {props.quantitySelected}
                <Button className="btn-quantity"
                    onClick={() =>
                        increaseQuantity(props.quantitySelected, props.quantityAvailable)
                    }
                >+</Button>
            </div>
            <div id='div-errorMsg'></div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        quantitySelected: state.productInfo.quantity
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        increment: (quantitySelected) => dispatch(incrementQuantity(quantitySelected)),
        decrement: (quantitySelected) => dispatch(decrementQuantity(quantitySelected))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeQuantity);