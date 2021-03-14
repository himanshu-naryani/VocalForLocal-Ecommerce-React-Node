import React from 'react';

import {Link, Route } from 'react-router-dom';

import  About  from '../Components/AboutPage/About';
import Help from '../Components/HelpPage/Help';


import { ImageUpload } from '../Components/firebase/App';
import AddProduct from '../Components/StartSelling/Addproduct';
import OrderTable from '../Components/OrderHistory/OrderTable';

export default function Home()
{
  return (
  <div >
   
   <Route  exact path="/orderhistory" component={OrderTable}></Route>
   <Route  exact path="/signin"></Route>
  
  
   <Route  path="/aboutus" component={About}></Route>
   <Route path="/help" component={Help}></Route>
   <Route path="/addseller" component={AddProduct}></Route>

   </div>
   )
}
