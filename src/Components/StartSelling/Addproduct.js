import React, { useState } from 'react';
import swal from "sweetalert";
import { connect } from 'react-redux';
import './startselling.scss';
import { ImageUpload } from '../firebase/App';
const axios = require("axios");
function AddProduct(props) {
  const [productState, setState] = useState("")

  const [productPrice, setPrice] = useState();
  const [listElements, setlistElements] = useState([]);
  const [productDescription, setDescription] = useState("");
  const [productName, setName] = useState("");

  const [quantityAvailable, setQuantity] = useState();
  const [productCategory, setCategory] = useState();
  const [productImages, setImage] = useState(null);
  let sellerEmail = ""

  if (props.user.data && props.user.data.userdata)
    sellerEmail = props.user.data.userdata.userEmail

  const priceEvent = (event) => {
    setPrice(event.target.value);
  };
  const stateEvent = (event) => {
    setState(event.target.value);
  }
  const handleUrl = (url) => {
    setImage(url);
  }
  const descriptionEvent = (event) => {
    setDescription(event.target.value);
  }
  const categoryEvent = (event) => {
    setCategory(event.target.value);
  }
  const nameEvent = (event) => {
    setName(event.target.value);
  }
  const quantityEvent = (event) => {
    setQuantity(event.target.value);
  }

  const listOfItems = (event) => {

    setlistElements((preValue) => {
      let userObject = {
        sellerEmailId: sellerEmail,
        productName: productName,
        productPrice: productPrice,
        quantityAvailable: quantityAvailable,
        productDescription: productDescription,
        productState: productState,
        productCategory: productCategory,
        productImages: productImages

      }
      axios.post('/createProduct', userObject)
        .then((data) => {
          const resData = data
          if (resData.data.status === 'success') {
            swal("Product details registered succesfully", "You will receive a mail shortly!");
          }
          else if (resData.data.status === 'fail') {

          }

        })
      return [...preValue, userObject];
    });

    setPrice();

    setName("");
    setDescription("");
    setQuantity();
    setCategory("");

  };


  return (

    <div className='addproduct'>

      <React.Fragment>
      </React.Fragment>

      <h1 className="title-seller">Register Your Product Details</h1>

      <React.Fragment>

      </React.Fragment>
      <form id="my-form" >

        <div className="form" style={{ height: '100%' }}>
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>
          <label>Product Name: </label>
          <input type='text' placeholder="Add product name" value={productName} onChange={nameEvent} required />
          <label>Product Price: </label>
          <input type='text' placeholder="Add product price" value={productPrice} onChange={priceEvent} required />

          <label>Product Description: </label>
          <input type='text' placeholder="Add Description" value={productDescription} onChange={descriptionEvent} required />
          <label>Quantity: </label>
          <input type='text' placeholder="Add quantity" value={quantityAvailable} onChange={quantityEvent} required />
          <label >State:</label>
          <select id="state" value={productState} onChange={stateEvent} name="state"><br />

            <option value="select">--Select State--</option>
            <option value="Arunachal Pradesh">Arunachal pradesh</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Bihar">Bihar</option>
            <option value="Assam">Assam</option>
          </select>
          <label >Category:</label>
          <input type='text' placeholder="Add category" value={productCategory} onChange={categoryEvent} required />
        Product Images:<br />

          <ImageUpload handleClick={handleUrl} />
        </div>
        <button id="form-btn" type="submit" onClick={listOfItems}>Submit</button><br />

      </form>

    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.signin.data
})



export default connect(mapStateToProps, null)(AddProduct)


