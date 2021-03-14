import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './productInfoPage.scss';
import queryString from 'query-string';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import OutOfStock from './OutOfStock';
import BuyNow from './BuyNow';
import SecurePaymentIcon from './Icons/secure-payment.png';
import CustomerSatisfactionIcon from './Icons/person.png';
import FreeDeliveryIcon from './Icons/free-delivery.png';
import { connect } from 'react-redux';
import SimilarCategoryProducts from '../SimilarCategoryProducts/SimilarCategoryProducts'
import ChangeQuantity from './ChangeQuantity';

let isProductDataAvailable = false;

let getProductData = () => { }

function RatingComp(props) {
    return (
        <div>

            <Rating
                name="read-only"
                value={props.ratingValue}
                precision={0.5}

                readOnly
            />

        </div>
    )
}

function ProductInfoPage(props) {

    const [productData, setProductData] = useState({});

    getProductData = async (url) => {
        await axios.get(url)
            .then(response => setProductData(response.data))
            .catch(error => error)
    }


    if ((props.userData !== null && props.userData.data !== null)) {
        console.log(props.userData)
    }


    let availability = false;

    let urlParams = queryString.parse(window.location.search);


    let productid = urlParams.value;



    useEffect(() => { //getting product data
        let url = `/product/${productid}`;
        getProductData(url)
        window.scrollTo(0, 0)
    }, [productid])
    { (productData == null || productData[0] == null) ? isProductDataAvailable = false : isProductDataAvailable = true }
    console.log("IsPRoductDataAvailable", isProductDataAvailable);

    function availabilitySetting(productData) {
        (productData[0].quantityAvailable === 0 || productData[0].quantityAvailable === null) ?
            (
                availability = false
            )
            :
            (
                availability = true
            )


    }

    (productData[0] != null) ? availabilitySetting(productData) : console.log("out of stock");



    async function deleteProductFromRequestedProducts() {

        if ((props.userData !== null)) {
            console.log(props.userData)
        }

        let removeRequestedProductUrl = `/user/removeRequestedProduct`;
        let dataToSend = {
            userEmail: "zzz@gmail.com",
            productId: productid
        }

        let productDeleted = false;

        await axios.delete(removeRequestedProductUrl, { data: dataToSend })
            .then(response => productDeleted = response.data.productDeleted)
            .catch(error => error)

        if (productDeleted) {
            let decrementProductRequestCountURL = `/product/decrementRequestCount/${productid}`

            await axios.put(decrementProductRequestCountURL)
                .then(response => response)
                .catch(error => error)
        }

    }

    if (availability) {
        deleteProductFromRequestedProducts();
    }

    return (
        <div className='productInfoPage' id="productInfoPage">
            <Container className="productContainer" xs={12} sm={12}>
                <Row className="row" xs={12} sm={12}>
                    <Col className="div-image" xs={12} sm={12} md={5}>
                        <img className='img-product'
                            src={isProductDataAvailable ? productData[0].productImages[0] : ""} alt='Product Image' />
                    </Col>
                    <Col className="div-data" xs={12} sm={12} md={6}>
                        <Row className='top-row'>
                            <header>{isProductDataAvailable ? productData[0].productName : "No product available"}</header>
                            <div className='top-row-inner-row-rating'>
                                <RatingComp ratingValue={isProductDataAvailable ? productData[0].averageRating : 3} />

                            </div>
                            <div className='top-row-inner-row-price'>₹ {isProductDataAvailable ? productData[0].productPrice : "0"}</div>
                        </Row>
                        <Row className='middle-row'>
                            {availability ? <ChangeQuantity quantityAvailable={productData[0].quantityAvailable} /> : null}
                            {availability ? <BuyNow productData={productData} /> : <OutOfStock />}
                        </Row>
                        <Row className='bottom-row'>
                            <header className='bottow-row-item' id='product-descripton-heading'>Description</header>
                            <p className='bottow-row-item'>{isProductDataAvailable ? productData[0].productDescription : "No data to display"}</p>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Container fluid className='productPage-icons-Container'>
                <div className='div-icon'>
                    <img className='icon' src={SecurePaymentIcon} alt="Secure payment" />
                    <p>Secure payments</p>
                </div>
                <div className='div-icon'>
                    <img className='icon' src={CustomerSatisfactionIcon} alt='Customer satisfaction' />
                    <p>Customer satisfaction</p>
                </div>

                <div className='div-icon'>
                    <img className='icon' src={FreeDeliveryIcon} alt='Free delivery' />
                    <p>Free delivery</p>
                </div>

            </Container>

            <Container className='container-similarProducts'>
                <header id='heading-similarProducts'>Similar products</header>
                <div className='similarProductsDisplay' style={{ textAlign: 'center' }}>
                    {isProductDataAvailable ?
                        <SimilarCategoryProducts
                            productCategory={isProductDataAvailable ? productData[0].productCategory : ""}
                            productId={isProductDataAvailable ? productData[0].productId : ""}
                        /> :
                        "No products"}
                </div>
            </Container>
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

export default connect(mapStateToProps)(ProductInfoPage);

export {
    getProductData
}