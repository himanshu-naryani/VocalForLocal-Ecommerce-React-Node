import { Route } from "react-router-dom";
import Signup from "./Signup/Signup";
import Signin from "./Signin/Login";
import Signout from './Signin/Signout'
import ForgetPassword from './Signin/ForgetPassword'
import 'bootstrap/dist/css/bootstrap.min.css';

import Payment from '../Payment/Payment'
import Cards from '../Payment/Cards'



function Main() {
  return (
    <div className="conatiner-fluid">
      <Route exact path="/Signin" component={Signin}></Route>
      <Route path="/Signup" component={Signup}></Route>
      <Route path="/Signout" component={Signout}></Route>

      <Route path="/ForgetPassword" component={ForgetPassword}></Route>

      {navigator.onLine && <Route path="/Payment" component={Payment}></Route>}
      <Route path="/Cards" component={Cards}></Route>
    </div>
  );
}
export default Main;
