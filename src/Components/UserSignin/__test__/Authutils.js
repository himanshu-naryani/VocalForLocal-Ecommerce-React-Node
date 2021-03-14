import { useLocation, Link, Route, Switch, useHistory } from 'react-router-dom'

export const RouteLocationDisplay = () => {
    const location = useLocation();

    return (
        <div data-testid='route-location-display'>{location.pathname}</div>
    )
}

const Home = () => <div>You are home</div>
const Signin = () => <div>signinpage</div>
const Signup =()=><div>signuppage</div>
const ForgetPassword=()=><div>Forgetpasswordpage</div>

export function TestApp() {
    const history = useHistory();

    return(
        <div>
        <Link to="/">Home</Link>
        <Link to="/signin">Signin</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/Forgetpassword">ForgetPassword</Link>

        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/signin">
                <Signin/>
            </Route>
            <Route path="/signup">
                <Signup/>
            </Route>
            <Route path="/Forgetpassword">
                <ForgetPassword/>
            </Route>

        </Switch>

        <RouteLocationDisplay/>
        </div>
    )
}