import { Route} from 'react-router-dom'
import {ExploreLocalPage} from '../Components/ExploreLocal/exploreLocalPage'
import {ResultsByState} from '../Components/ResultsPage/resultsByState'
import React from 'react'

export default function ExplorePageRoutes() {
    return (
        <div>
        <Route path = "/exploreLocal" component={ExploreLocalPage}/>
        <Route path = "/results" component={ResultsByState}/>
        </div>
    )
}

