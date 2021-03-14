import React from 'react';

import { Link } from 'react-router-dom';

import { Image } from 'react-bootstrap';
import { Grid } from '@material-ui/core';

import artifact from '../../images/img8.jpg'
import handicrafts from '../../images/img1.jpg'
import localJewellery from '../../images/img7.jpg'
import localEats from '../../images/img4.jpg'
import clothing from '../../images/img5.jpg'

import './MyCategoryProduct.scss'

function MyCategoryProduct() {

    return (
        <div className='main-div' >

            <h1 className='main-heading'>Product Categories</h1>

            <div style={{ marginTop: '5%' }}>

                <Grid container  >

                    <Grid item xs={12} sm={12} md={4} >
                        <div className='image-div'>
                            <Link to='/Artifacts'>
                                <Image src={artifact}
                                    className='images'
                                >
                                </Image>
                                <div className='headings'>Artifacts</div>
                            </Link>
                        </div>

                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <div className='image-div'>
                            <Link to='/Handicrafts'>
                                <Image src={handicrafts}
                                    className='images'
                                >

                                </Image>
                                <div className='headings'>Handicrafts</div>
                            </Link>
                        </div>

                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <div className='image-div'>
                            <Link to='/Clothing'>
                                <Image src={clothing}
                                    className='images'
                                >

                                </Image>
                                <div className='headings'>Clothing</div>
                            </Link>
                        </div>

                    </Grid>

                </Grid>

                <Grid container className='second-grid-container'>

                    <Grid item xs={12} sm={12} md={4} >
                        <div className='image-div'>
                            <Link to='/LocalJewellery'>
                                <Image src={localEats}
                                    className='images'>

                                </Image>
                                <div className='headings'>Local jewellery</div>
                            </Link>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <div className='image-div'>
                            <Link to='/LocalEats'>
                                <Image src={localJewellery}
                                    className='images'>

                                </Image>
                                <div className='headings'>Local Eats</div>
                            </Link>
                        </div>
                    </Grid>

                </Grid>
            </div>
        </div>

    )
}

export default MyCategoryProduct;