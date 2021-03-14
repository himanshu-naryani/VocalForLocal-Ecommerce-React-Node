import React from 'react';
import ReactDOM from 'react-dom';
import MyCarousel from '../MyCarousel';

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

it("Carousel renders without crashing", () => {
    ReactDOM.render(<MyCarousel></MyCarousel>, container);
})
