import React from 'react'
import Address from '../Address'
import AddToCart from '../AddToCart'
import Cart from '../Cart'
import CartError from '../CartError'
import CartImage from '../CartImage'
import CartItem from '../CartItem'
import Checkout from '../Checkout'
import DeleteItem from '../DeleteItem'
import Quantity from '../Quantity'
import {ComponentRender} from './TestUtils'
import '@testing-library/jest-dom/extend-expect';
import {cleanup, render, screen, fireEvent} from '@testing-library/react'
import { TestApp} from './TestUtils'
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';


afterEach(cleanup)


it("AddToCart renders without crashing", ()=>{
    ComponentRender(<AddToCart />)
});

it("CartError renders without crashing", ()=>{
    ComponentRender(<CartError />)
});

it("Checkout renders without crashing", ()=>{
    ComponentRender(<Checkout />)
});

it("DeleteItem renders without crashing", ()=>{
    ComponentRender(<DeleteItem />)
});

it("Quantity renders without crashing", ()=>{
    ComponentRender(<Quantity />)
});

it("CartImage renders without crashing", ()=>{
    ComponentRender(<CartImage />)
});

it("Cart renders without crashing", ()=>{
    ComponentRender(<Cart />)
});

it("CartItem renders without crashing", ()=>{
    ComponentRender(<CartItem />)
});

it("Address renders without crashing", ()=>{
    ComponentRender(<Address />)
});

it("Cart renders without crashing", ()=>{
    ComponentRender(<Cart />)
});



test('Cart route name is correct', () => {
    const history = createMemoryHistory()
    const route = '/cart'
    history.push(route)
    ComponentRender(<Router history={history}><Cart/></Router>)
})




test('Cart is navigating to the correct route with Link', () => {
    const history = createMemoryHistory();

    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)

    expect(screen.getByText(/you are home/i)).toBeInTheDocument()

    const leftClick = { button: 0 }
    fireEvent.click(screen.getByText(/Cart Page/i), leftClick)

    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)
    
    expect(screen.getByText('You are in Cart page')).toBeInTheDocument()
})
