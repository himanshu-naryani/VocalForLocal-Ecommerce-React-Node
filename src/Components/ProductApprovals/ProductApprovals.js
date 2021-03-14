import { getUnApprovedProducts, approveProduct } from '../../Redux/Actioncreators/PendingProductsActions'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import AdminProductCard from '../AdminProductCard/AdminProductCard'
import Loading from '../LoadingEffects/ProductLoading'
import axios from 'axios'

function ProductApprovals(props) {

    useEffect(() => {
        props.allUnApprovedProducts()

    }, [])
    const handleStatus = (id, status) => {
        props.approve(id)
        axios.patch('/product/approved', { productId: id, approvalStatus: status })
    }
    const productsObject = Object.entries(props.response.products)
    const productsArray = []
    for (let i = 0; i < productsObject.length; i++)
        productsArray[i] = productsObject[i]

    const products = <div className='row' >
        {productsArray.map((product) => (
            <div key={product[1].productId} className="col-lg-4 col-md-6" >
                <AdminProductCard status={handleStatus} product={product[1]} />
            </div>
        ))}
    </div>

    return (

        <div  >
            {props.response.loading && <Loading />}

            {products}

        </div>
    )
}

const mapStateToProps = (state) => ({
    response: state.unApprovedProducts
})

const mapDispatchToProps = dispatch => ({
    allUnApprovedProducts: () => dispatch(getUnApprovedProducts()),
    approve: (id) => dispatch(approveProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductApprovals)