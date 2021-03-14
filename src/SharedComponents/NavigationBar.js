import React from "react";
import { connect } from "react-redux";
import { Nav, Navbar, Form, FormControl, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import "./Navigation.scss";
import { NavLink } from 'react-router-dom';

import Search from './SearchBar/SearchBar';

import SignInAvatar from "./SignInAvatar";

const Styles = styled.div`
  .navbar {
    background: linear-gradient(to bottom, white, beige);
  }
  a,
  .navbar-nav,
  .navbar-light .nav-link {
    color: black;

    &:hover {
      color: #da3e52;
    }
  }
  .fa-shopping-cart:hover {
    color: #da3e52;
  }
  .navbar-brand {
    font-size: 30px;
    color: #fbaf00;
    &:hover {
      color: #da3e52;
    }
    @media only screen and (max-width: 590px) {
      font-size: 10px;
    }
    margin-right: 0;
    @media only screen and (max-width: 910px) {
      font-size: 20px;
    }
    @media only screen and (max-width: 478px) {
      font-size: 12px;
    }
  }

  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
    // width: 50%;
  }

  
  #dropdown-basic-button {
    color: black;
    background-color: white;
    font-weight: bold;
    font-size: 20px;
    &:hover {
      color: #de3a52;
    }
  }
`;


function NavigationBar(props) {
  let userdata = JSON.parse(localStorage.getItem('state'));
  let userName = ""
  if (props.user && props.user.data && props.user.data.userdata)
    userName = props.user.data.userdata.userName


  return (
    <Styles>
      <Navbar expand="lg" >
        <NavLink className="navbar-brand" to="/">Vocal for Local</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Form className="form-center">
          <InputGroup className="mb-3">

            <Search />

          </InputGroup>
        </Form>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <NavLink className="nav-link" to="/exploreLocal" style={{ color: "black" }}>
                <li className="ml-auto">Explore Local</li>
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink className="nav-link" to="/sellnow" style={{ color: "black" }}>
                <li className="ml-auto">Sell Now</li>
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink className="nav-link" to="/cart" style={{ color: "black" }} >
                <i className="fas fa-shopping-cart fa-2x"></i>
              </NavLink>
            </Nav.Item>
            <div style={{ "margin-top": "1.5%" }}>
              <SignInAvatar />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
}
const mapStateToProps = (state) => ({
  user: state.signin.data,
});
export default connect(mapStateToProps, null)(NavigationBar);
