import { cleanup } from '@testing-library/react';
import React from 'react'
import ReactDOM from 'react-dom'
import Login from '../Signin/Login'
import { render } from "@testing-library/react";
import ForgetPassword from '../Signin/ForgetPassword'
import Logout from '../Signin/Signout'
import ResetPassword from '../Signin/ResetPassword'
import Signup from '../Signup/Signup'
import {ComponentRender} from '../../Payment/__test__/Testutils'

afterEach(cleanup);
it("Login page renders wihtout crashing",()=>{
    ComponentRender(<Login/>)

});
it("Logout page renders wihtout crashing",()=>{
    ComponentRender(<Logout/>)

});
it("ForgetPassword renders wihtout crashing",()=>{

    const div =document.createElement("div");
    ReactDOM.render(<ForgetPassword/>,div);
    // ComponentRender(<Payment/>)

});
it("Reset password renders wihtout crashing",()=>{

    const div =document.createElement("div");
    ReactDOM.render(<ResetPassword/>,div);
  

});
it("Signup page renders wihtout crashing",()=>{

    const div =document.createElement("div");
    ReactDOM.render(<Signup/>,div);
   

});
// jest.mock('Signup',()=>({


// }))
it("routing",()=>{
   const {getByTestId}= render(<Signup></Signup>)
   expect(getByTestId("signup-button")).toBeTruthy()
})
it("routing to forget",()=>{
    const {getByTestId}= render(<ForgetPassword></ForgetPassword>)
    expect(getByTestId("forget-test")).toBeTruthy()
 })
