
 import React from 'react';
 import ReactDOM from 'react-dom';
 import { BrowserRouter } from 'react-router-dom';
 import About from '../About'
 
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
 
 it("About renders without crashing", () => {
     ReactDOM.render(
         
             <About/>
        
         , container);
 })