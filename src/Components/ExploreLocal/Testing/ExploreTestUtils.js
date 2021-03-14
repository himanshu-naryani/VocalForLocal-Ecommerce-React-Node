import { useLocation, Link, Route, Switch, useHistory } from 'react-router-dom'

export const RouteLocationDisplay = () => {
    const location = useLocation();

    return (
        <div data-testid='div-route-location-display'>{location.pathname}</div>
    )
}

const Home = () => <div>You are home</div>
const ExploreLocal = () => <div>You are in explore local</div>


export function TestApp() {
    const history = useHistory();

    return(
        <div>
        <Link to="/">Home</Link>
        <Link to="/exploreLocal">ExploreLocal</Link>

        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/exploreLocal">
                <ExploreLocal/>
            </Route>

        </Switch>

        <RouteLocationDisplay/>
        </div>
    )
}