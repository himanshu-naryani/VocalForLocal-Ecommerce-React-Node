import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import './exploreLocalPage.scss';
import andhraPradhesh from './ExploreLocalImages/andhraPradesh.jpg';
import arunachalPradhesh from './ExploreLocalImages/arunachalPradesh.jpg';
import assam from './ExploreLocalImages/assam.jpg';
import bihar from './ExploreLocalImages/bihar.jpg';
import rajasthan from './ExploreLocalImages/rajasthan.jpg';
import axios from 'axios';

let productData = {};


function StateCardLeft(props) {

    const [hover, setHover] = useState(false);
    const history = useHistory();

    async function handleClick(event) {

        let stateNameOfButton = event.target.name;
        let url = `/products/state/${stateNameOfButton}`; //getting all products

        await axios.get(url)
            .then((response) => {
                productData = response.data;
            })
            .catch((error) => console.log(error));

        history.push(`/results`);
    }

    return (
        <Container style={{ marginBottom: "" }}>
            <Row>
                <Col md={4} className="container-img" onMouseOver={() => {
                    setHover(true);
                }}
                    onMouseLeave={() => {
                        setHover(false);
                    }}
                >
                    <Image src={props.image} rounded width="90%" height="200px" className="img-stateProduct" />
                    {hover &&
                        (
                            <Button className="btn-shopNow" name={props.stateName}
                                onClick={handleClick}>Shop Now</Button>)}
                </Col>
                <Col>
                    <header className="state-heading">{props.heading}</header>
                    <p>{props.content}</p>
                </Col>
            </Row>
        </Container>
    );
}

function StateCardRight(props) {

    const [hover, setHover] = useState(false);
    const history = useHistory();

    async function handleClick(event) {

        let stateNameOfButton = event.target.name;

        let url = `/products/state/${stateNameOfButton}`; //getting all products
        await axios.get(url)
            .then((response) => {
                productData = response.data;
            })
            .catch((error) => console.log(error));


        history.push(`/results`);
    }

    return (
        <Container style={{ marginBottom: "" }}>
            <Row>
                <Col>
                    <header className="state-heading">{props.heading}</header>
                    <p>{props.content}</p>
                </Col>
                <Col md={4} className="container-img" onMouseOver={() => {
                    setHover(true);
                }}
                    onMouseLeave={() => {
                        setHover(false);
                    }}>
                    <Image src={props.image} rounded width="90%" height="200px" className="img-stateProduct" />
                    {hover &&
                        (<Button className="btn-shopNow" name={props.stateName}
                            onClick={handleClick}>Shop Now</Button>)}
                </Col>
            </Row>

        </Container>
    );
}

function ExploreLocalPage() {
    return (
        <div className='div-exploreLocal' data-testid="explore-test" name="exploreName">

            <StateCardLeft heading="ANDHRA PRADESH, INDIA" image={andhraPradhesh} stateName="andhraPradesh" content="This state is famous for its artistic brass handicrafts originating primarily from the Budithi Village. An ancient and archetypical business for local artisans, brass showpieces are widely available around the area. The plus point of buying directly from the artisans is to promote local talent and boost the economy of the region." />
            <StateCardRight heading="ARUNACHAL PRADESH, INDIA" image={arunachalPradhesh} stateName="arunachalPradesh" content="If you love collecting traditional wood and bamboo artefacts, then Arunachal Pradesh is the place to be. Encompassed with vast and lush green forests, this state has no dearth of raw materials. Skilled artisans put good use to the readily available wood and bamboo by craving out beautiful masks, baskets and ornaments that draw tourists from across the globe." />
            <StateCardLeft heading="ASSAM, INDIA" image={assam} stateName="assam" content="Assam, one of India's largest tea producers, is known for their brisk and malty tea flavours that serve the purpose of ideal souvenirs and gifts. Sold in gorgeous handmade boxes the tea mix is foil packed in cloth bags to retain the freshness. A rich, intoxicating brew is a real indulgence to bring back home." />
            <StateCardRight heading="BIHAR, INDIA" image={bihar} stateName="bihar" content="Exclusive styles of Indian art, travellers visiting the state know Bihar for its Kalam paintings that are a coveted item to add to your home. Apart from this, Madhubani painting practised in the Mithila region of Bihar is also a very sought after souvenir by tourists. Making these paintings unique is the method used by artisans to craft them. They use fingers, twigs, brushes, nib-pens, and matchsticks, and natural dyes and pigments characterized by eye-catching geometrical patterns. to add intricate details to their artwork." />
            <StateCardLeft heading="RAJASTHAN, INDIA" image={rajasthan} stateName="Rajasthan" content="Rajasthan welcomes everyone with a wide, colourful hug. It will leave you breathless with the variety of handicrafts that it has to offer. Intricate designs like those of paisleys can often be found on most of these handicrafts like jootis(traditional Indian slippers), offbeat pieces of jewellery, pottery, art, fabric and even quilts!  Known for their intricate meenakari and jadau jewellery, one of the most bought souvenirs in the state are the puppets." />

        </div>
    );
}

export {
    ExploreLocalPage,
    productData
}

