import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MyCategoryProducts from '../MyCategoryProducts'

import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("MyCategoryProducts renders without crashing", () => {
    ReactDOM.render(
        <BrowserRouter>
            <MyCategoryProducts></MyCategoryProducts>
        </BrowserRouter>
        , container);
})
