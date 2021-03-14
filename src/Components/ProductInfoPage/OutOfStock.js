import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import './outOfStock.scss'
import queryString from 'query-string';


function OutOfStock() {

    let urlParams = queryString.parse(window.location.search);
    let productid = urlParams.value;


    const responseData = useState({
        productFound: true,
        message: ""
    });


    useEffect(() => {

    }, [])

    async function handleClick() {

        let addRequestedProductUrl = `/user/addRequestedProduct`;

        let dataToSend = {
            userEmail: "zzz@gmail.com",
            productId: productid
        }


        await axios.post(addRequestedProductUrl, dataToSend)
            .then(response => {
                responseData.productFound = response.data.productFound;
                responseData.message = response.data.message;
            })
            .catch(error => error)



        let errorDiv = document.getElementById('errorMsg-outOfStock');

        if (!responseData.productFound) {
            let incrementProductRequestCountUrl = `/product/updaterequestcount/${productid}`;

            await axios.patch(incrementProductRequestCountUrl)
                .then(res => res)
                .catch(err => err)

            errorDiv.innerHTML = "";
        }
        else {
            if (responseData.message != null) {
                errorDiv.innerHTML = responseData.message;
            }
        }
    }

    return (
        <div className='div-outOfStock' id="div-outOfStock">
            <header id='heading-outOfStock'>Out of Stock</header>
            <Button className='btn-requestProduct' id="btn-requestProduct" onClick={handleClick}>Request product</Button>
            <div id='errorMsg-outOfStock'></div>
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state.signin.data && state.signin.data.data)

        return ({

            userData: state.signin.data.data.userdata

        })
    return ({
        userData: state.signin.data// data is an object
    })
}

export default connect(mapStateToProps)(OutOfStock);