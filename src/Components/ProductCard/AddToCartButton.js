import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addItemInCart } from "../../Redux/Actioncreators/Actions";
import axios from "axios";

import './AddToCartButton.scss';

function AddToCartButton(props) {
    const id = props.productId; //Get from props
    const quant = props.quantity; //Get from props
    const [status, setStatus] = useState(false)

    const [productIsPresent, setProductIsPresent] = useState(false);
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
            setStatus(true)
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
        <div >
            {!productIsPresent ? (
                <button className='cart-btn' onClick={() => addToCart()}> Add to cart</button >
            ) : (
                    <button className='cart-btn' onClick={() => goToCart()}>Go to Cart</button >
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

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButton);
