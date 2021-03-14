import React,{useState,useEffect} from 'react'
import {connect} from "react-redux"
import axios from 'axios'
import ProductLoading from '../LoadingEffects/ProductLoading'
import NoProducts from './NoProducts'
import DisplayProducts from './DisplayProducts'

function SellerProducts(props) {
    const sellerEmail=props.email 
    const [products , setProducts] = useState()
    const [loading , setLoading] = useState(true)
    useEffect(() => {
        axios
        .get('/products/sold?email='+sellerEmail)
        .then((res)=>{setProducts(res.data)
        setLoading(false)
    })
    .catch((err)=>{
        
    })
    },[])
    return (
        <div>
            {!products&&<ProductLoading/>}
            {!loading&&products[0]?<DisplayProducts products={products}/>:<NoProducts/>}
        </div>
    )
}

const mapStateToProps = (state) => {
    if(state.signin.data && state.signin.data.data &&state.signin.data.data.userdata )
    return ({
        email : state.signin.data.data.userdata.userEmail
    })
    else 
    return ({})
}



export default connect(mapStateToProps , null)(SellerProducts)