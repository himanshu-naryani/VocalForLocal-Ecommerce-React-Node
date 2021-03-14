import React from 'react'
import './AddToCartButton.scss'

function AddToCartButton(props) {
    return (
        <div onClick={props.onClick} className="addtocart-btn" style={{width:"200px"}}>
                <div className=" container-card-button-addtocart">
                        <button 
                            type="button"
                            className="btn btn-default-addtocart" 
                        >
                            Add to Cart
                        </button>
                        <i className="fa fa-shopping-cart icon-card-addtocart"></i>
                </div>
      </div>
    )
}

export default AddToCartButton





