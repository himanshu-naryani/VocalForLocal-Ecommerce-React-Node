import React, { useState } from "react";
import "./Upi.scss";
import phonepe from "./PayImages/phonepere.png";
import gpay from "./PayImages/gpay.png";
import upiIcon from "./PayImages/upire.png";

import Upiform from "./Upiform";


function Upi(props) {
  const [upi, Setupi] = useState(0);
  const handleRadio = (value) => {
    Setupi(value);
  };
  return (
    <div className="upi">
      <h5>Pay using UPI</h5>
      <div className="upi_methods">
        <div className="each_pay">
          <input
            type="radio"
            id="female"
            name="upimethod"
            onClick={() => { handleRadio(1) }}
            value="1"
            style={{ display: "inline" }}
          />
          <img
            src={gpay}
            alt="gpay"
            style={{
              width: "18%",
              marginTop: "-2%",
              marginLeft: "5%",
              marginBottom: "5%",
            }}
          />
        </div>
        {(upi === 1) ? <Upiform userdetails={props.userdetails}></Upiform> : null}
        <div className="each_pay">
          <input
            type="radio"
            id="otherupi"
            name="upimethod"
            onClick={() => { handleRadio(3) }}
            style={{ marginLeft: "1.2vw" }}
            value="3"
          />
          <img
            src={upiIcon}
            alt="upi"
            style={{ width: "20%", marginTop: "-2.2%", marginLeft: "1vw", marginBottom: "5%" }}
          />
        </div>
        {(upi === 3) ? <Upiform userdetails={props.userdetails}></Upiform> : null}
        <div className="each_pay">
          <input
            type="radio"

            name="upimethod"

            onClick={() => { handleRadio(2) }}
            value="2"
            style={{ display: "inline", marginLeft: "-2.5%" }}
          />
          <img
            src={phonepe}
            alt="Phonepe"
            style={{ width: "32%", marginTop: "-4%", marginLeft: "1%" }}
          />
        </div>
        {(upi === 2) ? <Upiform userdetails={props.userdetails}></Upiform> : null}

      </div>
      <div className="each_pay" style={{ "margin": "5%", "fontSize": "10px", "marginTop": "10%", "marginLeft": "11%" }}>

        If transaction fails for any unexpected reason ,the debited amount will be automatically credited to your account

      </div>
    </div>
  );
}

export default Upi;
