import React from "react";
import {Nav} from "react-bootstrap";
import './sidebar.css'


const Sidebar = props => {
    return (
        <>
            <Nav className="col-lg-12  ">
                {props.children}
            </Nav>
       
          </>
        );
  };

  export default Sidebar