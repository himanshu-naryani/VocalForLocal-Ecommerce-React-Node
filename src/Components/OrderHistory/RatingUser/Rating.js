import RatingIcon from "./RatingIcon";
import React, { useState, useEffect } from 'react'
import './rating.scss';
import swal from "sweetalert";
const axios = require('axios')
const Rating = (props) => {
  let [productRating, setProductRating] = React.useState(0);
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  useEffect(() => {
    axios.get('/product/' + props.data.productId)
        .then((response) => {
            setProductRating(response.data[0].averageRating)

        })
        .catch()
}, [])
  const onMouseEnter = (index) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index) => {

    setRating(index);
    var rate=0;
      if(productRating===0)
      {
        rate=index;
      }
      else
      {
       rate=((productRating+index)/2)
      }
    const rating = {
      productId: props.data.productId,
      averageRating: rate
    }
   
    axios.patch('/updateRating/', rating
    )
      .then((data) => {
        swal("Rating updated succesfully", "Thank you!");
       
       

      })

  };
  return (
    <div>
      <div style={{paddingBottom:"1%"}}>Status: Delivered</div>
    <div className="box flex">
      
      
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          
          <RatingIcon
            index={index}
            rating={rating}
            hoverRating={hoverRating}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onSaveRating={onSaveRating}
          />

        )

      })}
   
    </div>
    </div>
  );
}
export default Rating;