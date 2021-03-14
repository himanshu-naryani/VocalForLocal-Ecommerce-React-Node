import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import RootReducer from '../../../Redux/Reducers/index';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { useLocation, Link, Route, Switch, useHistory } from 'react-router-dom'

//RENDERING UTILS
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

const productContainerGrid = ({children}) => {
    return(
        <div>
            <Container>
                <Row>
                    <Col>{children}</Col>
                    <Col>
                        <Row>{children}</Row>
                        <Row>{children}</Row>
                        <Row>{children}</Row>
                    </Col>
                </Row>
            </Container>
            <Container>{children}</Container>
            <Container>{children}</Container>
        </div>
    )
}

const productContainerRender = (component) => {
    return render(component, {wrapper: productContainerGrid})
}

const BuyNowContainer = ({children}) => {
    return(
        <div>
            {children}
        </div>
    )
}

const buyNowContainerRender = (component) => {
    return render(component, {wrapper: BuyNowContainer})
}

const OutOfStockContainer = ({children}) => {
    return(
        <div>
            <header></header>
            <Button></Button>
            <div></div>
        </div>
    )
}

const outOfStockContainerRender = (component) => {
    return render(component, {wrapper: OutOfStockContainer})
}

//ROUTING UTILS
export const RouteLocationDisplay = () => {
    const location = useLocation();
 
    return (
        <div data-testid='div-route-location-display'>{location.pathname}</div>
    )
}

const Home = () => <div>You are home</div>
const ProductPage = () => <div>You are in product info page</div>

export function TestApp() {
    const history = useHistory();

    return(
        <div>
        <Link to="/">Home</Link>
        <Link to="/product">ProductInfo</Link>

        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/product">
                <ProductPage/>
            </Route>

        </Switch>

        <RouteLocationDisplay/>
        </div>
    )
}



export {
    productContainerRender,
    buyNowContainerRender,
    outOfStockContainerRender
}