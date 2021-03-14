import React from 'react'
import { Route } from 'react-router-dom'
import ProductInfoPage from '../Components/ProductInfoPage/productInfoPage';

export default function ProductInfoPageRoutes() {
    return(
        <div>
            <Route path='/product' component={ProductInfoPage}/>
        </div>
    )
}