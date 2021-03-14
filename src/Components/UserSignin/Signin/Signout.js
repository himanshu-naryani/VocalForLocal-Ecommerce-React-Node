import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { logOut } from "../../../Redux/Actioncreators/Actions";
import "./Signout.scss";
import {emptySubtotal} from '../../../Redux/Actioncreators/SubTotalAction'
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
const Signout = ({ data, logoutUser,makeSubTotalEmpty }) => {
  let history = useHistory();
  const handleSignout = async () => {
    makeSubTotalEmpty()
    await logoutUser();
    history.push("/");
  };
  return (
    <div className="signout">
      <div class="signout_inside">
        <h2 style={{ "fontWeight": "bold" }}>Thank you</h2>
        <h4 style={{ "marginBottom": "5%", "marginTop": "2%",fontSize:"11px" }}>
          vocal for local
        </h4>

        <button
          onClick={handleSignout}
          className="btn btn-primary"
          id="signoutsubmit"
          style={{"width":"70%","margin":"auto","marginBottom":"5%"}}
        >
          SIGN OUT
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userData: state.signin.data,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(logOut()),
    makeSubTotalEmpty : ()=>dispatch(emptySubtotal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signout);
