import React from 'react'
import ProductInfoPage from '../productInfoPage'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import {reduxComponentRender, productContainerRender, TestApp, RouteLocationDisplay} from './ProductTestUtils';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'

afterEach(cleanup);

//RENDERING TESTS
test('Page renders correctly with Redux', () => {
    reduxComponentRender(<ProductInfoPage/>)
})

test('Product container Grid renders correctly', () => {
    let dom = reduxComponentRender(<ProductInfoPage/>)
    const productInfoGridContainer = dom.container.querySelector("productInfoPage");
    productContainerRender(productInfoGridContainer)
})

//ROUTING TESTS
test('Product page route name is correct', () => {
    const history = createMemoryHistory();
    const route = '/product';
    history.push(route);
    render(
        <Router history = { history }>
            <RouteLocationDisplay/>
        </Router>
    )

    expect(screen.getByTestId('div-route-location-display')).toHaveTextContent(route);
})

test('Profile Page navigating perfectly', () => {
    const history = createMemoryHistory();

    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)

    expect(screen.getByText(/you are home/i)).toBeInTheDocument();

    const leftClick = { button: 0 }
    fireEvent.click(screen.getByText(/ProductInfo/i), leftClick);

    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)
    
    expect(screen.getByText(/You are in product info page/i)).toBeInTheDocument();
})







