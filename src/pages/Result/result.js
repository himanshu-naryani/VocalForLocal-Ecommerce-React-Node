import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import './result.scss';

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import ProductCard from '../../Components/ProductCard/ProductCard';
import NoProducts from '../../Components/SellerProducts/NoProducts';

import queryString from 'query-string';

import LoadingEffects from '../../Components/LoadingEffects/ProductLoading'

function Results(props) {

    let location = useLocation();

    const params = queryString.parse(location.search);
    console.log(params);

    const { category } = props;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [indianState, setIndianState] = useState('All States');

    useEffect(() => {
        if (params.value !== undefined) {
            console.log('params !== null')
            axios.get(`/getAllProductsByName?productName=${params.value}`)
                .then(response => {
                    console.log('...........Params..........')
                    console.log(response.data);
                    setProducts(response.data)
                    setLoading(false);

                })
                .catch(err => {
                    console.log(err);
                })
        }
        else if (category === 'LatestProducts') {
            axios.get(`/LatestProducts`)
                .then(response => {
                    console.log(response.data);

                    setProducts(response.data)
                    setLoading(false);

                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })
        }
        else {
            axios.get(`/products/category/${category}`)
                .then(response => {
                    console.log(response.data);

                    setProducts(response.data)
                    setLoading(false);

                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })
        }

    }, [location])

    const sortingHandler = (sortingOrder) => {
        let sortedProducts = [];

        if (sortingOrder === 'High Price') {
            sortedProducts = [...products.sort((a, b) => (a.productPrice < b.productPrice) ? 1 : -1)]
        }
        else if (sortingOrder === 'Low Price') {
            sortedProducts = [...products.sort((a, b) => (a.productPrice > b.productPrice) ? 1 : -1)]
        }
        else {
            sortedProducts = [];
        }
        setProducts(sortedProducts);
    }

    return (
        <div >
            <div className='filter-div'>
                <div className='heading-div'>
                    {(category == null) ? <h1 className='heading' >{(params.value) ? params.value.toUpperCase() : ''}</h1> :
                        (category === 'LatestProducts') ?
                            <h1 className='heading' >Latest Products</h1> : <h1 className='heading' >{category} Category</h1>
                    }
                </div>

                <div className='filter-dropdown-div'>
                    <DropdownButton variant='none' className='filter-dropdown' id="dropdown-basic" title="Sort" direction="left" >
                        <Dropdown.Item onSelect={() => {
                            sortingHandler('High Price')
                        }
                        }
                        >High Price</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {
                            sortingHandler('Low Price')
                        }
                        }>Low Price</Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton variant='none' className='filter-dropdown' title="State Filter" direction="left" >
                        <Dropdown.Item onSelect={() => {
                            setIndianState('All States')
                        }
                        }
                        >All States</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {
                            setIndianState('Arunachal Pradesh')
                        }
                        }
                        >Arunachal Pradesh</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {
                            setIndianState('Rajasthan')
                        }
                        }>Rajasthan</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {
                            setIndianState('andhraPradesh')
                        }
                        }>Andhra Pradesh</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {
                            setIndianState('bihar')
                        }
                        }>Bihar</Dropdown.Item>
                        <Dropdown.Item onSelect={() => {
                            setIndianState('Gujrat')
                        }
                        }>Gujrat</Dropdown.Item>
                    </DropdownButton>
                </div>


            </div>

            <div className='products-div'>
                {
                    (products.length === 0 && loading === true) && <LoadingEffects />
                }
                {
                    (products.length !== 0 && loading === false) && <ProductCard stateName={indianState} products={products}></ProductCard>
                }
                {
                    (products.length === 0 && loading === false) && <NoProducts />
                }
            </div>

        </div>

    )
}

export default Results;
