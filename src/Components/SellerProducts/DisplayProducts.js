import React from 'react'
import SellerProductCard from '../SellerProductCard/SellerProductCard'
export default function DisplayProducts({products}) {

    return (
        <div>
            <SellerProductCard sellerProducts={products} />
        </div>
    )
}
