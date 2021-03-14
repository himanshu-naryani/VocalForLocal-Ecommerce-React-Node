import { useLocation, Link, Route, Switch, useHistory } from 'react-router-dom'

export const RouteLocationDisplay = () => {
    const location = useLocation();
 
    return (
        <div data-testid='div-route-location-display'>{location.pathname}</div>
    )
}

const Home = () => <div>You are home</div>
const ResultsByState = () => <div>You are in results by state page</div>


export function TestApp() {
    const history = useHistory();

    return(
        <div>
        <Link to="/">Home</Link>
        <Link to="/results">ResultsByState</Link>

        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/results">
                <ResultsByState/>
            </Route>

        </Switch>

        <RouteLocationDisplay/>
        </div>
    )
}