import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { unmountComponentAtNode } from "react-dom";

import Result from '../result.js';


let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container)
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Results page renders without crashing", () => {
    ReactDOM.render(
        <BrowserRouter>
            <Result></Result>
        </BrowserRouter>
        , container);
})

