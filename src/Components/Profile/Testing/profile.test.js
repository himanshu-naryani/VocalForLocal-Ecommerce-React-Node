import {cleanup, render, screen, fireEvent} from '@testing-library/react'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import EditProfile from '../editProfilePage' //normal component
import ProfileRendering, {ProfileDisplay} from '../profilePage' //redux component and normal
import {RouteLocationDisplay, TestApp, reduxComponentRender, ErrorBoundary} from './ProfileUtils'

afterEach(cleanup)

//RENDERING TESTS
test('Edit Profile component renders correctly', () => {
    render(
        <ErrorBoundary>
            <EditProfile/>
        </ErrorBoundary>
    )
})

test('Profile Display component renders correctly', () => {

    render(
        <ErrorBoundary>
            <ProfileDisplay/>
        </ErrorBoundary>
    
    )
})

test('Profile rendering component renders correctly with redux', () => {
    reduxComponentRender(<ProfileRendering/>)
} )

//ROUTING TESTS
test('Profile page route name is correct', () => {
    const history = createMemoryHistory();
    const route = '/profile';
    history.push(route);
    render(
        <Router history = { history }>
            <RouteLocationDisplay/>
        </Router>
    )

    expect(screen.getByTestId('div-route-location-display')).toHaveTextContent(route);
})

test('Profile Page navigating perfectly', () => {
    const history = createMemoryHistory();

    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)

    expect(screen.getByText(/you are home/i)).toBeInTheDocument();

    const leftClick = { button: 0 }
    fireEvent.click(screen.getByText(/Profile/i), leftClick);

    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)
    
    expect(screen.getByText(/You are in profile page/i)).toBeInTheDocument();
})


