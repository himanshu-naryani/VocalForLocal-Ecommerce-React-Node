
 import React from 'react';
 import ReactDOM from 'react-dom';
 import { BrowserRouter } from 'react-router-dom';
 import NavigationBar from '../NavigationBar'
 import {ComponentsRender}  from '../../Shared/Testutils';
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
 
 it("Navigation Bar renders without crashing", () => {
    ComponentsRender(<BrowserRouter>
        <NavigationBar/>
    </BrowserRouter>)
 })