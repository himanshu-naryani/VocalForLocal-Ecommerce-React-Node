import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Autocomplete from '@material-ui/lab/Autocomplete';

import { useHistory } from 'react-router-dom';

import './SearchBar.scss';

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import { makeStyles } from '@material-ui/core';

import styled from "styled-components";

const SearchInputBar = styled.div`
    .searchInputBar{
        border-radius: '50px';
        background-color: 'red';
    
    }
`;

let productNames = [];

const useStyles = makeStyles(theme => ({
    dropdown: {
        fontSize: '1w',
        border: '1px solid lightgrey',
        borderRadius: '5px',


        height: '70%',
        '@media screen and (max-width: 920px)': {
            height: '50%',
            width: '150%'

        },
        '@media screen and (max-width: 700px)': {
            marginTop: "7%"
        }
    },

    inputRoot: {

        padding: '2px',
        "& .MuiOutlinedInput-notchedOutline": {
            border: '2px solid purple'
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "red"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple"
        }
    }
}));


function Search() {

    const classes = useStyles();
    const history = useHistory();

    const [filter, setFilter] = useState('Product Name');

    const [products, setProducts] = useState([]);

    const [value, setValue] = useState('');

    const productCategories = ["LocalEats", "LocalJewellery", "Clothing", "Handicrafts", "Artifacts"]


    useEffect(() => {

        if (filter !== 'Category Wise') {
            axios.get('/getAllProductNames')
                .then(response => {
                    productNames = response.data;
                    setProducts(productNames);
                })
                .catch(error => {

                })
        }

    }, [])

    const onClickHandler = () => {

        let linkTo = (filter === 'Product Name') ? (value === '') ? '/' : `/mySearch?value=${value}` : `/${value}`;

        setValue('');
        history.push(linkTo);
    }

    return (

        <SearchInputBar>

            <div className='search-div' >
                <DropdownButton size='md' className={classes.dropdown} variant='none' direction="left" >
                    <Dropdown.Item onSelect={() => {
                        setProducts(productNames)
                        setFilter('Product Name')

                    }
                    }
                    >Product Name</Dropdown.Item>
                    <Dropdown.Item onSelect={() => {
                        setProducts(productCategories)
                        setFilter('Category Wise')
                    }
                    }>Category Wise</Dropdown.Item>

                </DropdownButton>

                <div className='autocomplete-div'>
                    <Autocomplete
                        size='small'
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue)
                        }}
                        id="controllable-states-demo"
                        options={products}
                        renderInput={(params) => <div ref={params.InputProps.ref}>
                            <input style={{ width: '100%', borderRadius: '30px', height: '40px', }} type="text" {...params.inputProps} />
                        </div>}
                    />
                </div>

                <i
                    onClick={() => onClickHandler()}
                    className="fa fa-search fa-2x "
                    aria-hidden="true"
                />


            </div >
        </SearchInputBar>
    )
}


export default Search;
