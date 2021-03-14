import React from 'react'
import Button from '@material-ui/core/Button'
import './GoToCartButton.scss'

function GoToCartButton(props) {
    return (
        <div onClick = {props.onClick}>
            <Button id='btn-goToCart'>Go To Cart</Button>
        </div>
    )
}

export default GoToCartButton
