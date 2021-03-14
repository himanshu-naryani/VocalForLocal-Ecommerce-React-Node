import { Route} from 'react-router-dom'
import Profile from '../Components/Profile/profilePage'
import React from 'react'

export default function ProfileRoutes() {
    return(
        <div>
            <Route path="/profile" component={Profile} />
        </div>
    )
}