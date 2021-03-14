import React from 'react';
import { Link } from 'react-router-dom';

import HomePageStyle from './home.scss';

import { Image, Button } from 'react-bootstrap';

import Grid from '@material-ui/core/Grid';

import MyCarousel from '../../Components/Carousel/MyCarousel';
import MyLatestProduct from '../../Components/LatestProducts/MyLatestProducts'
import MyCategoryProduct from '../../Components/CategoryProducts/MyCategoryProducts'

import manImage from '../../images/man-homepage.jpg';
import womanImage from '../../images/woman-homepage.jpg';
import { useState } from 'react';

function Home() {

  const [exploreBtn, setExploreBtn] = useState(false);

  return (
    <div className="home">
      <MyCarousel></MyCarousel>
      <MyLatestProduct></MyLatestProduct>

      <div className='my-explore-products'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Image className='home-img'
              src={manImage}
              alt="Explore Products" fluid></Image>

          </Grid>
          <Grid item xs={12} md={6} onMouseEnter={() => { setExploreBtn(true) }} onMouseLeave={() => { setExploreBtn(false) }}>
            <Image className='home-img'
              src={womanImage}
              alt="Explore Products" fluid></Image>

            {exploreBtn && <Link to='/exploreLocal'>
              <Button style={HomePageStyle} variant="primary">Explore Products</Button>
            </Link>
            }

          </Grid>
        </Grid>
      </div>
      <MyCategoryProduct></MyCategoryProduct>
    </div >
  );
}

export default Home;