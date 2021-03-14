import {cleanup, render, screen, fireEvent} from '@testing-library/react'
import {ResultsByState} from '../resultsByState'
import {RouteLocationDisplay, TestApp} from './resultsTestUtils'
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';

afterEach(cleanup)

//RENDERING TESTS
test('Results by State Page renders correctly', () => {
    render(<ResultsByState/>)
})

//ROUTING TESTS
test('Results by state route name is correct', () => {
    const history = createMemoryHistory()
    const route = '/results'
    history.push(route)
    render(
        <Router history={history}>
            <RouteLocationDisplay/>
        </Router>
    )
})

test('Results by state is navigating to the correct route with Link', () => {
    const history = createMemoryHistory();

    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)

    expect(screen.getByText(/you are home/i)).toBeInTheDocument()

    const leftClick = { button: 0 }
    fireEvent.click(screen.getByText(/ResultsByState/i), leftClick)

    render(
        <Router history = {history}>
            <TestApp/>
        </Router>)
    
    expect(screen.getByText(/You are in results by state page/i)).toBeInTheDocument()
})

