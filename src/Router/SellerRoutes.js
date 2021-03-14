import { Route} from 'react-router-dom'
import Seller from '../Components/SellerPage/Seller'
import React from 'react'
export default function SellerRoutes() {
    return (
        <div>
             <Route path="/seller" component={Seller}></Route>
            
        </div>
    )
}

