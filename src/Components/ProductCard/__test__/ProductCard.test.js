import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { unmountComponentAtNode } from "react-dom";

import ProductCard from '../ProductCard.js';


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

it("MyLatestProducts renders without crashing", () => {
    ReactDOM.render(
        <BrowserRouter>
            <ProductCard></ProductCard>
        </BrowserRouter>
        , container);
})
