import React from 'react';

import { Carousel, Image } from 'react-bootstrap';


import 'bootstrap/dist/css/bootstrap.min.css';

import './Carousel.scss';

import boxHandbag from '../../images/car1.jpg';
import handmadePlates from '../../images/car2.jpg';
import lights from '../../images/car4.jpg';


function MyCarousel() {
    return (
        <Carousel className='my-carousel' >
            <Carousel.Item interval={2000}>

                <Image
                    src={boxHandbag}
                    className="d-block w-100 carouselImg"

                    alt="First slide "
                />


                <Carousel.Caption>
                    <p className='main-para'>PURE SKILL AND BEAUTY</p>

                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>

                <Image
                    className="d-block w-100 carouselImg"
                    src={handmadePlates}


                    alt="Second slide"
                />


                <Carousel.Caption>
                    <p className='main-para'>BUY AT RESONABLE PRICE</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>

                <Image
                    className="d-block w-100 carouselImg"
                    src={lights}

                    alt="Third slide"
                />

                <Carousel.Caption>
                    <p className='main-para'>EXPLORE THE REAL INDIA</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default MyCarousel;