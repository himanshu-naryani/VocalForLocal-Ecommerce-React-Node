import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";
import './footer.scss';
import { NavLink } from "react-router-dom";

const FooterPage = () => {
  return (
    <div className="footer">
      <MDBFooter color="blue" className="font-small pt-4">
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow>
            <MDBCol md="6">
              <NavLink to="/" style={{ textDecoration: 'none' }}>
                <h3 className="title" style={{ fontSize: '30px' }}>  Vocal For Local </h3></NavLink>
              <b><font size="4" style={{ color: "black" }}>Pure skill and beauty</font></b>
            </MDBCol>
            {/* <MDBCol md="6"> */}
            <div className="item" >

              <ul style={{ listStyleType: "none" }}>
                <h2 style={{ fontSize: '20px', color: "black" }}>ShopBy</h2>

                <li >

                  <NavLink to="/exploreLocal" className="list-unstyled" style={{ textDecoration: "none" }}>States</NavLink>
                </li>
                <li style={{ fontWeight: "bold" }}>

                  Category
              </li>
                <li className="list-unstyled">
                  <NavLink to="/Artifacts" style={{ textDecoration: 'none' }}>Artifacts</NavLink>

                </li>
                <li className="list-unstyled">
                  <NavLink to="/Handicrafts" style={{ textDecoration: 'none' }}>Handicrafts</NavLink>


                </li>
                <li className="list-unstyled">
                  <NavLink to="/Clothing" style={{ textDecoration: 'none' }}>Clothing</NavLink>


                </li>
                <li className="list-unstyled">
                  <NavLink to="/LocalJewellery" style={{ textDecoration: 'none' }}>LocalJewellery</NavLink>
                </li>
                <li className="list-unstyled">
                  <NavLink to="/LocalEats" style={{ textDecoration: 'none' }}>LocalEats</NavLink>
                </li>
              </ul>

            </div>
            <div className="item">
              <ul style={{ listStyleType: "none" }}>

                <li >
                  <NavLink to="/aboutus" className="list-unstyled" style={{ textDecoration: "none" }}>About</NavLink>
                </li>
                <li className="list-unstyled">
                  <NavLink to="/help" className="list-unstyled" style={{ textDecoration: "none" }}>Help</NavLink>
                </li>

              </ul>

            </div>





            <ul>
              <h2 style={{ fontSize: '20px', color: "black" }}>Connect with us</h2>
              <li className="list-unstyled">
                <a href="http://www.instagram.com"><MDBIcon fab icon="instagram" size="3x" style={{ color: '#da3e52' }} /></a>
              </li>
              <li className="list-unstyled">
                <a href="http://www.facebook.com"><MDBIcon fab icon="facebook" size="3x" style={{ color: "darkblue" }} /></a>
              </li>

            </ul>

          </MDBRow>

        </MDBContainer>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright: <a href="https://www.vocalforlocal.com" style={{ color: "darkblue" }} > VocalForLocal.com </a>
          </MDBContainer>
        </div>
      </MDBFooter>
    </div>
  );
}

export default FooterPage;