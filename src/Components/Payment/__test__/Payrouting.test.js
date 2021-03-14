import React from 'react';
import {cleanup, render, screen, fireEvent} from '@testing-library/react';
// import {ExploreLocalPage} from '../exploreLocalPage';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {RouteLocationDisplay, TestApp} from './Payutils' ;

afterEach(cleanup);

// test('Explore local page renders correctly', ()=> {
//     render(<ExploreLocalPage/>)
// })

test('payment route name is correct', () => {
    const history = createMemoryHistory();
    const route = '/payment';
    history.push(route);
    render(
        <Router history = { history }>
            <RouteLocationDisplay/>
        </Router>
    )
    expect(screen.getByTestId('route-location-display')).toHaveTextContent(route);
})

test('navigating to payment page perfectly', () => {
    const history = createMemoryHistory();
    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)
    expect(screen.getByText(/you are home/i)).toBeInTheDocument();
    const leftClick = { button: 0 };
    fireEvent.click(screen.getByText(/Payment/i), leftClick);
    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)
    expect(screen.getByText(/checkoutpage/i)).toBeInTheDocument();
})


