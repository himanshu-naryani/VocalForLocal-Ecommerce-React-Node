import './resultsByState.scss';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { productData } from '../ExploreLocal/exploreLocalPage';
import React from 'react'
import { useHistory } from 'react-router-dom';


let productid = "";

function ResultCard(props) {
    const history = useHistory();


    function handleClick(event) {
        productid = event.target.name || ""

        history.push(`/product?value=${productid}`);
    }

    return (
        <Container className="result-card">
            <Image
                className="result-product-image"
                src={props.productImage}
                alt="Product image"
                roundedCircle
            />
            <header>{props.productName}<br />Price: ₹{props.productPrice}</header>
            <Button name={props.productID} onClick={handleClick} className="btn-buyNow">View</Button>
        </Container>
    );
}


function ResultsByState(props) {

    let count = -1;

    const results = (productData && productData.data && productData.data.length) ? (
        productData.data.map(product => {
            count++;
            return (
                <Col className="outer-col" xs={12} md={4}>
                    <ResultCard productImage={productData.data[count].productImages[0]} productName={productData.data[count].productName} productPrice={productData.data[count].productPrice} productID={productData.data[count].productId} />
                </Col>

            )
        })
    ) : (
            <div id='div-noProducts'>No products available</div>
        ) //this is just results

    return (
        <div>
            <Container fluid className="heading">
                <header id="resultsByState-heading">Results</header>
            </Container>
            <Container fluid className="body">
                <Row>
                    {results}
                </Row>
            </Container>
        </div>
    );
}

export {
    ResultsByState,

}