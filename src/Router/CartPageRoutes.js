import { Route} from 'react-router-dom'
import Cart from '../Components/CartPage/Cart'
import React from 'react'


export default function CartRoutes() {
    return (
        <div>
             <Route path="/cart" component={Cart}></Route>
        </div>
    )
}
