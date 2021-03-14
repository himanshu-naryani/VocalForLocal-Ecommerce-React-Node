import { Route } from "react-router-dom";
import SignUp from "../Components/UserSignin/Signup/Signup";
import Signin from "../Components/UserSignin/Signin/Login";
import ForgetPassword from '../Components/UserSignin/Signin/ForgetPassword'

function AuthenticationRoutes() {
  return (
    <div className="conatiner-fluid">
      <Route exact path="/Signin" component={Signin}></Route>
      <Route path="/Signup" component={SignUp}></Route>
      <Route path="/ForgetPassword"component={ForgetPassword}></Route>
    </div>
  );
}
export default AuthenticationRoutes;
