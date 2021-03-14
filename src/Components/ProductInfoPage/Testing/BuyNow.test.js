import React from 'react'
import BuyNow from '../BuyNow';
import {reduxComponentRender, buyNowContainerRender} from './ProductTestUtils';
import {cleanup} from '@testing-library/react';

afterEach(cleanup);

test('Buy now component renders with redux correctly', () => {
    reduxComponentRender(<BuyNow/>);
})

test('Buy now renders correctly with its structure', ()=> {
    let dom = reduxComponentRender(<BuyNow/>)
    const BuyNowContainer = dom.container.querySelector("div-buyNow");
    buyNowContainerRender(BuyNowContainer)
})

