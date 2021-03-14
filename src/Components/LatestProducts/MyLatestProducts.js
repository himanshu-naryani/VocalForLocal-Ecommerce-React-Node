import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

import { Image } from 'react-bootstrap';

import AddToCartButton from '../ProductCard/AddToCartButton';

import './MyLatestProducts.scss';

function MyLatestProducts() {

    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        axios.get('/topLatestProducts')
            .then(response => {
                setLatestProducts(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div style={{ marginTop: '2%' }}>

            <h1 className='main-heading-latest'>Latest Products</h1>
            <Grid container  >
                {
                    latestProducts.map((product) => (
                        <Grid item key={product.productId} xs={12} sm={12} md={4} >
                            <div className='image-div'>
                                <Link to={`/product?value=${product.productId}`} >
                                    <Image src={product.productImages[0]}
                                        className='images'
                                    >
                                    </Image>
                                </Link>
                                <div className='headings'>{product.productName}</div>
                                <div className='headings'>₹{product.productPrice}</div>


                                <div className='btn-div' style={{ marginTop: '5px' }}>
                                    <Link to={`/product?value=${product.productId}`}>
                                        <button className='buy-now-btn' >View</button>
                                    </Link>
                                    <AddToCartButton

                                        productId={product.productId}
                                        quantity={1}>
                                    </AddToCartButton>
                                </div>
                            </div>

                        </Grid>
                    ))

                }
            </Grid>


            <Link to='/LatestProducts'>
                <button className='seeAll-btn'>See All</button>
            </Link>

        </div>
    )
}

export default MyLatestProducts;
