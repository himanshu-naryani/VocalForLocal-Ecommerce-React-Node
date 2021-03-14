import { cleanup, render } from '@testing-library/react';
import React from 'react'
import ReactDOM from 'react-dom'
import Payment from '../Payment'
import Cards from '../Cards'
import Cod from '../Cod'
import Upi from '../Upi'
import Upiform from '../Upiform'
import {ComponentRender,structureRender} from './Testutils'

afterEach(cleanup);
it("Payment page renders wihtout crashing",()=>{
    ComponentRender(<Payment/>)

});
it("Card renders without crashing ",()=>{
    ComponentRender(<Cards/>)
    
})
it("Cod renders without crashing ",()=>{
    ComponentRender(<Cod/>)
    
})
it("Upi form renders without crashing ",()=>{
    ComponentRender(<Upiform/>)
    
})
it("Upi page renders wihtout crashing",()=>{

    const div =document.createElement("div");
    ReactDOM.render(<Upi></Upi>,div);
    // ComponentRender(<Payment/>)

});
it("Payment page rendering structure test",()=>{
    let dom=ComponentRender(<Payment/>);
    const paymentStructure=dom.container.getElementsByClassName("pay_container");
    structureRender(paymentStructure);

    
})
it("routing ",()=>{
    
})

