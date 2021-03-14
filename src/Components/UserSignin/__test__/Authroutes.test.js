import React from 'react';
import {cleanup, render, screen, fireEvent} from '@testing-library/react';
// import {ExploreLocalPage} from '../exploreLocalPage';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {RouteLocationDisplay, TestApp} from './Authutils' ;

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
    fireEvent.click(screen.getByText(/Signin/i), leftClick);
    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)
    expect(screen.getByText(/signinpage/i)).toBeInTheDocument();
})
test('navigating to signup page perfectly', () => {
    const history = createMemoryHistory();
    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)
    expect(screen.getByText(/you are home/i)).toBeInTheDocument();
    const leftClick = { button: 0 };
    fireEvent.click(screen.getByText(/Signup/i), leftClick);
    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)
    expect(screen.getByText(/signuppage/i)).toBeInTheDocument();
})
test('navigating to forget password page perfectly', () => {
    const history = createMemoryHistory();
    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)
    expect(screen.getByText(/you are home/i)).toBeInTheDocument();
    const leftClick = { button: 0 };
    fireEvent.click(screen.getByText(/ForgetPassword/i), leftClick);
    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)
    expect(screen.getByText(/forgetpasswordpage/i)).toBeInTheDocument();
})

