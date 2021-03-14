
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Addproduct from '../Addproduct';
import { unmountComponentAtNode } from "react-dom";
import { ComponentsRender } from '../../../Shared/Testutils';
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

it("Add Product renders without crashing", () => {
    ComponentsRender(<Addproduct />)


})




