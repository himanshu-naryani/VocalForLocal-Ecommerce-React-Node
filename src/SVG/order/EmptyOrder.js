import React from 'react'
import { NavLink } from 'react-router-dom';
import bgImage from '.././bg.jpg';
import './emptyorder.scss';

import Divider from '@material-ui/core/Divider';
import image from './order.png'
function EmptyOrder() {
    return (
        <div style={{textAlign: "center"}} className="emptyOrder">
            
      <div className="parent">  
     
   <img src={bgImage} className="img1" />
   <p className="header">
 
       Empty Order History
      
   </p>
   
<img src={image} className="img2"/>
<h3 className="txt" >You haven't placed any order yet.
 <NavLink style={{color:"#FBAF00"}}to='/'> Shop Now?</NavLink> <Divider style={{ width: "100%", margin: "auto", backgroundColor:"white",height:"2px" }} />
 </h3>

</div>

</div>
)
}

export default EmptyOrder
