import React from 'react'
import { useLocation, Link, Route, Switch, useHistory } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import RootReducer from '../../../Redux/Reducers/index'
import { render } from '@testing-library/react'


export const RouteLocationDisplay = () => {
    const location = useLocation();
 
    return (
        <div data-testid='div-route-location-display'>{location.pathname}</div>
    )
}

const Home = () => <div>You are home</div>
const ProfilePage = () => <div>You are in profile page</div>

export function TestApp() {
    const history = useHistory();

    return(
        <div>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>

        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/profile">
                <ProfilePage/>
            </Route>

        </Switch>

        <RouteLocationDisplay/>
        </div>
    )
}

export function reduxComponentRender(
    component,
    {
        store = createStore(RootReducer),
        ...renderOptions
    } = {}
) {
    function Wrapper({children}) {
        return(<Provider store={store}>{children}</Provider>)
    }
    return render(component, {wrapper: Wrapper, ...renderOptions})
}

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        console.log(`error:${error}, errorInfo:${errorInfo}`)
    }

    render() {
        if (this.state.errorInfo) {

          return (
            <div>
              <h2>Something went wrong.</h2>
              <details style={{ whiteSpace: 'pre-wrap' }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </details>
            </div>
          );
        }

        return this.props.children;
    }
}
