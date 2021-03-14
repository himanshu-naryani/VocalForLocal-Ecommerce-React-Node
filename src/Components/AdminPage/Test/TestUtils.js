import {render} from '@testing-library/react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import RootReducer from '../../../Redux/Reducers/index'
import { useLocation, Link, Route, Switch, useHistory } from 'react-router-dom'
import {createMemoryHistory} from 'history';

export const RouteLocationDisplay = () => {
    const location = useLocation();
    return (
        <div data-testid='div-route-location-display'>{location.pathname}</div>
    )
}

const Home = () => <div>You are home</div>
const Admin = () => <div>You are in Admin page</div>


export function TestApp() {
    return(
        <div>
        <Link to="/">Home</Link>
        <Link to="/admin">Admin Page</Link>

        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/admin">
                <Admin/>
            </Route>

        </Switch>

        <RouteLocationDisplay/>
        </div>
    )
}


export function ComponentRender(component , {store=createStore(RootReducer),...renderOptions}={}){
    function Wrapper({children}){
        return (
            <Provider store={store}>{children}</Provider>
        )
    }
    return render(component , {wrapper:Wrapper  , ...renderOptions})
}

export function AdminRouteTester(component , {store=createStore(RootReducer),...renderOptions}={}){
            const history = createMemoryHistory()
            const route = '/admin'
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
