import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Image } from 'react-bootstrap';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import './SimilarCategoryProducts.scss'

import { useLocation } from 'react-router-dom';

function SimilarCategoryProducts(props) {

    let location = useLocation();

    const params = {
        productId: (props != null && props.productId != null && props.productId != "") ? props.productId : 'd09d137e-9b9c-47c1-8ba5-ec0c3bc1cb18',
        productCategory: (props != null && props.productCategory != null && props.productId != "") ? props.productCategory : 'Artifacts'
    }

    const [products, setproducts] = useState({});

    useEffect(() => {
        axios.post(`/getSimilarCategoryProducts`,
            params
        )
            .then(response => {
                console.log(response.data);
                setproducts(response.data);

            })
            .catch(error => {
                console.log(error);
            })
    }, [location])

    return (
        <div className='similar-category-products'>

            {(products.length > 0) ?

                <Grid container  >
                    {products.map(product => (
                        <Grid item key='1' xs={12} sm={12} md={4} >
                            <div className='image-div similar-category-div'>
                                <Link to={`/product?value=${product.productId}`} >
                                    <Image src={product.productImages[0]}
                                        className='images'
                                    >
                                    </Image>
                                </Link>
                                <div class='prod-details'>{product.productName}</div>
                                <div class='prod-details'>₹{product.productPrice}</div>
                                <Link to={`/product?value=${product.productId}`} >
                                    <button className='buy-btn'>
                                        View
                                    </button>
                                </Link>
                            </div>

                        </Grid>
                    )
                    )}
                </Grid>
                :
                <h1>No Products</h1>
            }
        </div>
    )
}

export default SimilarCategoryProducts;
