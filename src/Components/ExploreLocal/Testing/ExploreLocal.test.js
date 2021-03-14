import React from 'react';
import {cleanup, render, screen, fireEvent} from '@testing-library/react';
import {ExploreLocalPage} from '../exploreLocalPage';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {RouteLocationDisplay, TestApp} from './ExploreTestUtils'

afterEach(cleanup);

//RENDERING TESTS
test('Explore local page renders correctly', ()=> {
    render(<ExploreLocalPage/>)
})

//ROUTING TESTS
test('Explore local route name is correct', () => {
    const history = createMemoryHistory();
    const route = '/exploreLocal';
    history.push(route);
    render(
        <Router history = { history }>
            <RouteLocationDisplay/>
        </Router>
    )

    expect(screen.getByTestId('div-route-location-display')).toHaveTextContent(route);
})

test('Explore Local Page navigating perfectly', () => {
    const history = createMemoryHistory();

    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)

    expect(screen.getByText(/you are home/i)).toBeInTheDocument();

    const leftClick = { button: 0 }
    fireEvent.click(screen.getByText(/ExploreLocal/i), leftClick);

    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)
    
    expect(screen.getByText(/You are in explore local/i)).toBeInTheDocument();
})
