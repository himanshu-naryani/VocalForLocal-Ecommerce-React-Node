// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import { unmountComponentAtNode } from "react-dom";

// import Home from '../home.js';


// let container = null;
// beforeEach(() => {
//     // setup a DOM element as a render target
//     container = document.createElement("div");
//     document.body.appendChild(container)
// });

// afterEach(() => {
//     // cleanup on exiting
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
// });

// it("Home Page renders without crashing", () => {
//     ReactDOM.render(
//         <BrowserRouter>
//             <Home></Home>
//         </BrowserRouter>
//         , container);
// })


import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import {ExploreLocalPage} from '../exploreLocalPage';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { RouteLocationDisplay, TestApp } from './homeTestUtils'

import Home from '../home.js';

afterEach(cleanup);

//RENDERING TESTS
test('HOME page renders correctly', () => {
    <BrowserRouter>
        render(<Home />)
    </BrowserRouter>
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

    expect(screen.getByTestId('home-test-div')).toHaveTextContent(route);
})


test('HOME Page navigating perfectly', () => {
    const history = createMemoryHistory();

    render(
        <Router history={history}>
            <TestApp />
        </Router>)

    expect(screen.getByText(/You are home/i)).toBeInTheDocument();



    const leftClick = { button: 0 }
    fireEvent.click(screen.getByText(/ExploreLocal/i), leftClick);

    render(
        <Router history={history}>
            <TestApp />
        </Router>)

    expect(screen.getByText(/You are in explore local/i)).toBeInTheDocument();


})


// describe('Testing home routes', () => {
//     test('HOME Page navigating perfectly', () => {
//         const history = createMemoryHistory();

//         render(
//             <Router history={history}>
//                 <TestApp />
//             </Router>)

//         expect(screen.getByText(/You are home/i)).toBeInTheDocument();

//         const leftClick = { button: 0 }
//         fireEvent.click(screen.getByText(/ExploreLocal/i), leftClick);

//         render(
//             <Router history={history}>
//                 <TestApp />
//             </Router>)

//         expect(screen.getByText(/You are in explore local/i)).toBeInTheDocument();
//     })

//     afterEach(cleanup)

//     test('Explore to home navigation', () => {
//         fireEvent.click(screen.getByText(/Home/i), leftClick);

//         render(
//             <Router history={history}>
//                 <TestApp />
//             </Router>)
//         expect(screen.getByText(/You are home/i)).toBeInTheDocument();
//     })

// })

  // fireEvent.click(screen.getByTestId('home-test-id'), leftClick);

    // render(
    //     <Router history={history}>
    //         <TestApp />
    //     </Router>)
    // expect(screen.getByText(/You are home/i)).toBeInTheDocument();