import { useLocation, Link, Route, Switch, useHistory } from 'react-router-dom'

export const RouteLocationDisplay = () => {
    const location = useLocation();

    return (
        <div data-testid='home-test-div'>{location.pathname}</div>
    )
}

const Home = () => <div>You are home</div>
const ExploreLocal = () => <div>You are in explore local</div>


export function TestApp() {
    const history = useHistory();
    console.log(location.pathname)
    return (
        <div>

            <Link to="/exploreLocal">ExploreLocal</Link>
            <Link to="/" data-testid='home-test-id'>Home</Link>

            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route path="/exploreLocal">
                    <ExploreLocal />
                </Route>

            </Switch>

            <RouteLocationDisplay />
        </div>
    )
}
