import { Route } from 'react-router-dom'
import Admin from '../Components/AdminPage/Admin'
import React from 'react'


export default function AdminRoutes() {
    return (
        <div>
            <Route path="/admin" component={Admin}></Route>


        </div>
    )
}

