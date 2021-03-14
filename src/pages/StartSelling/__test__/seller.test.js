import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import {ExploreLocalPage} from '../exploreLocalPage';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { RouteLocationDisplay, TestApp, ComponentsRender } from './sellerTestUtils'

import Seller from '../seller.js';

afterEach(cleanup);

//RENDERING TESTS
test('Start Selling page renders correctly', () => {

    ComponentsRender(
        <BrowserRouter>
            <Seller />
        </BrowserRouter>
    )
})

//ROUTING TESTS
test('HOME route name is correct', () => {
    const history = createMemoryHistory();
    const route = '/';
    history.push(route);
    render(
        <Router history={history}>
            <RouteLocationDisplay />
        </Router>
    )

    expect(screen.getByTestId('startSelling-test-div')).toHaveTextContent(route);
})


test('HOME Page navigating perfectly', () => {
    const history = createMemoryHistory();

    render(
        <Router history={history}>
            <TestApp />
        </Router>)

    expect(screen.getByText(/You are home/i)).toBeInTheDocument();



    const leftClick = { button: 0 }
    fireEvent.click(screen.getByText(/StartSelling/i), leftClick);

    render(
        <Router history={history}>
            <TestApp />
        </Router>)

    expect(screen.getByText(/You are in start selling/i)).toBeInTheDocument();
})