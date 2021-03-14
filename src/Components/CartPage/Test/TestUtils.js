import {render} from '@testing-library/react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import RootReducer from '../../../Redux/Reducers/index'
import { useLocation, Link, Route, Switch, useHistory } from 'react-router-dom'
import {createMemoryHistory} from 'history';

export function ComponentRender(component , {store=createStore(RootReducer),...renderOptions}={}){
    function Wrapper({children}){
        return (
            <Provider store={store}>{children}</Provider>
        )
    }
    return render(component , {wrapper:Wrapper  , ...renderOptions})
}


export function CartRouteTester(component , {store=createStore(RootReducer),...renderOptions}={}){
    const history = createMemoryHistory()
    const route = '/cart'
    history.push(route)
function Wrapper({children}){
return (
    
    <Provider store={store}>
        <Router history={history}>
            {children}
        </Router>
    </Provider>
)
}
return render(component , {wrapper:Wrapper  , ...renderOptions})
}


export const RouteLocationDisplay = () => {
    const location = useLocation();
    return (
        <div data-testid='div-route-location-display'>{location.pathname}</div>
    )
}

const Home = () => <div>You are home</div>
const Cart = () => <div>You are in Cart page</div>


export function TestApp() {
    return(
        <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart Page</Link>

        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/cart">
                <Cart/>
            </Route>

        </Switch>

        <RouteLocationDisplay/>
        </div>
    )
}
