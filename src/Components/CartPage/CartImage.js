import React from 'react'
import CardMedia from '@material-ui/core/CardMedia';



function CartImage({pic,onClick}) {
    return (

        <CardMedia className="productimage-cartitem gotoproduct-cartitem" onClick={onClick} style={{}} image={pic} src="pic" title="No Image"/>

    )
}

export default CartImage
