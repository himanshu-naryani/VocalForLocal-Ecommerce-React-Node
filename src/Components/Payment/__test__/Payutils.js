import { useLocation, Link, Route, Switch, useHistory } from 'react-router-dom'

export const RouteLocationDisplay = () => {
    const location = useLocation();

    return (
        <div data-testid='route-location-display'>{location.pathname}</div>
    )
}

const Home = () => <div>You are home</div>
const Payment = () => <div>checkoutpage</div>


export function TestApp() {
    const history = useHistory();

    return(
        <div>
        <Link to="/">Home</Link>
        <Link to="/payment">Payment</Link>

        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/payment">
                <Payment/>
            </Route>

        </Switch>

        <RouteLocationDisplay/>
        </div>
    )
}