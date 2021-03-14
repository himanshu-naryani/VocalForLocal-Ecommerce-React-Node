import { Route, Link, } from 'react-router-dom';
import Results from '../pages/Result/result';

import Home from '../pages/Home/home';
import Seller from '../pages/StartSelling/seller';

function HomepageRoutes() {

    return (
        <div>

            <Route exact path='/' component={Home}></Route>


            <Route path='/Artifacts' render={(props) => (
                <Results category='Artifacts'></Results>
            )}></Route>


            <Route path='/Handicrafts' render={(props) => (
                <Results category='Handicrafts'></Results>
            )}></Route>


            <Route path='/Clothing' render={(props) => (
                <Results category='Clothing'></Results>
            )}></Route>


            <Route path='/LocalJewellery' render={(props) => (
                <Results category='LocalJewellery'></Results>
            )}></Route>


            <Route path='/LocalEats' render={(props) => (
                <Results category='LocalEats'></Results>
            )}></Route>


            <Route path='/LatestProducts' render={(props) => (
                <Results category='LatestProducts'></Results>
            )}></Route>

            <Route path='/sellNow' render={() => (<Seller></Seller>)}></Route>


            <Route path='/mySearch/'
                component={Results}
            ></Route>

        </div>

    )
}

export default HomepageRoutes;