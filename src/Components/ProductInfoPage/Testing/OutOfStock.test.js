import React from 'react';
import {cleanup, render} from '@testing-library/react';
import OutOfStock from '../OutOfStock';
import {outOfStockContainerRender, reduxComponentRender} from './ProductTestUtils';


afterEach(cleanup);

test('Out of Stock component renders correctly', () => {
    reduxComponentRender(<OutOfStock/>)
})

test('Out of stock structure renders correctly', () => {
    let dom = reduxComponentRender(<OutOfStock/>)
    const outOfStockContainer = dom.container.querySelector('div-outOfStock')
    outOfStockContainerRender(outOfStockContainer);
})