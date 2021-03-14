import React from "react";
import { Container } from 'react-bootstrap';
import './about.scss';

function About() {
  return (
    <div id="about-section" >
      <Container >
        <h2 id="heading">About Us</h2>
      </Container>
      <Container>
        <h4 id="sub-heading">Vocal For Local</h4>
        <h4 id="content">An E-commerce website to sell and buy famous local products, for local sellers and street shoppers.</h4>
      </Container>
    </div>
  )
}
export default About;