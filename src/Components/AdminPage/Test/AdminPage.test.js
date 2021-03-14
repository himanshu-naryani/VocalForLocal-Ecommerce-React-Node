
import React from 'react'

import { ComponentRender } from './TestUtils'
import Admin from '../Admin'
import AddPromo from '../AddPromo'
import ShowPromos from '../ShowPromos'
import SidebarComponent from '../SidebarComponent'
import AdminProductCard from '../../AdminProductCard/AdminProductCard'
import ImageCarousel from '../../AdminProductCard/ImageCarousel'
import LoadingEffects from '../../LoadingEffects/ProductLoading'
import SideBar from '../../Sidebar/sidebar'
import SellerFAQ from '../../SellerProductCard/SellerFAQ'
import SellerProductCard from '../../SellerProductCard/SellerProductCard'
import StatusButton from '../../SellerProductCard/StatusButton'
import SellerSideBar from '../../Sidebar/SellerSideBar'
import Seller from '../../SellerPage/Seller'
import NoProducts from '../../SellerProducts/NoProducts'
import SellerProducts from '../../SellerProducts/SellerProducts'
import DisplayProducts from '../../SellerProducts/DisplayProducts'
import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen, fireEvent } from '@testing-library/react'

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { TestApp } from './TestUtils';

afterEach(cleanup)


it("Admin renders without crashing", () => {
    ComponentRender(<Admin />)
});

it("AddPromos renders without crashing", () => {
    ComponentRender(<AddPromo />)
});

it("ShowPromos renders without crashing", () => {
    ComponentRender(<ShowPromos />)
});

it("SidebarComponent renders without crashing", () => {
    ComponentRender(<SidebarComponent />)
});

it("ImageCarousel renders without crashing", () => {
    ComponentRender(<ImageCarousel />)
});

it("AdminProductCard renders without crashing", () => {
    ComponentRender(<AdminProductCard />)
});

it("Loading Effects renders without crashing", () => {
    ComponentRender(<LoadingEffects />)
});

it("SideBar renders without crashing", () => {
    ComponentRender(<SideBar />)
});

it("Seller FAQs renders without crashing", () => {
    ComponentRender(<SellerFAQ />)
});

it("Status Button FAQs renders without crashing", () => {
    ComponentRender(<StatusButton />)
});

it("Seller Product Card FAQs renders without crashing", () => {
    ComponentRender(<SellerProductCard />)
});

it("SellerPage renders without crashing", () => {
    ComponentRender(<Seller />)
});

it("Seller Side Bar renders without crashing", () => {
    ComponentRender(<SellerSideBar />)
});

it("No products renders without crashing ", () => {
    ComponentRender(<NoProducts />)
})

it("Sellerproducts renders without crashing ", () => {
    ComponentRender(<SellerProducts />)
})

it("Display products renders without crashing ", () => {
    ComponentRender(<DisplayProducts />)
})



test('Admin route name is correct', () => {
    const history = createMemoryHistory()
    const route = '/admin'
    history.push(route)
    ComponentRender(<Router history={history}><Admin /></Router>)
})




test('Admin is navigating to the correct route with Link', () => {
    const history = createMemoryHistory();

    render(
        <Router history={history}>
            <TestApp />
        </Router>)

    expect(screen.getByText(/you are home/i)).toBeInTheDocument()

    const leftClick = { button: 0 }
    fireEvent.click(screen.getByText(/Admin Page/i), leftClick)

    render(
        <Router history={history}>
            <TestApp />
        </Router>)

    expect(screen.getByText('You are in Admin page')).toBeInTheDocument()
})
