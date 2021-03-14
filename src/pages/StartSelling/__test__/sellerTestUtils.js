import { useLocation, Link, Route, Switch, useHistory } from 'react-router-dom';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { RootReducer } from '../../../Redux/Reducers/index';

export const RouteLocationDisplay = () => {
    const location = useLocation();

    return (
        <div data-testid='startSelling-test-div'>{location.pathname}</div>
    )
}

const Home = () => <div>You are home</div>
const Seller = () => <div>You are in start selling</div>


export function TestApp() {
    const history = useHistory();
    console.log(location.pathname)
    return (
        <div>

            <Link to="/sellNow">StartSelling</Link>
            <Link to="/" >Home</Link>

            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route path="/sellNow">
                    <Seller />
                </Route>

            </Switch>

            <RouteLocationDisplay />
        </div>
    )
}

export function ComponentsRender(component,
    {
        store = createStore(RootReducer),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return (<Provider store={store}>{children}</Provider>)
    }
    return render(component, { wrapper: Wrapper, ...renderOptions })
}
