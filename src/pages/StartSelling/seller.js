import React from 'react';
import './seller.scss';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ContactMailIcon from '@material-ui/icons/ContactMail';

import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import MoneyIcon from '@material-ui/icons/Money';
import GroupIcon from '@material-ui/icons/Group';

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";


function Seller(props) {

    let history = useHistory();

    const onClickHandler = async () => {

        let sellerEmail = ""

        if (props.user.data && props.user.data.userdata)
            sellerEmail = props.user.data.userdata.userEmail

        if (sellerEmail && props.user.data.userdata.userIsSeller) {
            history.push('/seller')
        }
        else if (sellerEmail && !props.user.data.userdata.userIsSeller) {
            history.push('/signup')
        }
        else {
            history.push('/signin')
        }
    }
    return (
        <div style={{ margin: '0', padding: '0' }}>

            <div className='seller-div'>

                <h1 style={{ marginTop: '7%' }}>We help you improve your business, start selling now!</h1>
                <Button className='start-sell-btn' onClick={onClickHandler} >Start Selling</Button>

            </div>

            <div className='div-content'>
                <h1>
                    Why sell on VocalForLocal?
                </h1>
                <p>
                    Because you can showcase your products to crores of customers & businesses - 24 hours a day - on India's most visited shopping destination. More than 5 lakh businesses, big and small, sell on VocalForLocal today. Start your selling journey with us and expand your business reach.
                </p>
            </div>
            <div className='div-icons'>

                <Container maxWidth="md">

                    <hr style={{ backgroundColor: 'black', width: '100%' }} />
                    <div className='seller-benefits'><h1 >Seller Benefits</h1></div>
                    <hr style={{ backgroundColor: 'black' }} />

                    <Grid container spacing={10} >

                        <Grid item key='1' xs={12} sm={12} md={6} style={{ textAlign: 'center' }}>
                            <div className='icon-div'>
                                <MoneyIcon className='my-icons'></MoneyIcon>
                                <h2 >Receive Payments</h2>
                                <p >Funds are safely deposited directly to your bank account, even for Pay on Delivery orders, every 7 days.</p>
                            </div>

                        </Grid>
                        <Grid item key='2' xs={12} sm={12} md={6} style={{ textAlign: 'center' }} >
                            <div className='icon-div'>
                                <GroupIcon className='my-icons'></GroupIcon>
                                <h2>Reach more users</h2>
                                <p >Funds are safely deposited directly to your bank account, even for Pay on Delivery orders, every 7 days.</p>
                            </div>
                        </Grid>
                        <Grid item key='3' xs={12} sm={12} md={6} style={{ textAlign: 'center' }}>
                            <div className='icon-div'>
                                <AccountBalanceIcon className='my-icons'></AccountBalanceIcon>
                                <h2>Sell from your place</h2>
                                <p >Funds are safely deposited directly to your bank account, even for Pay on Delivery orders, every 7 days.</p>
                            </div>
                        </Grid>
                        <Grid item key='4' xs={12} sm={12} md={6} style={{ textAlign: 'center' }}>
                            <div className='icon-div'>
                                <BusinessCenterIcon className='my-icons' />

                                <h2>Make your business global</h2>
                                <p >Funds are safely deposited directly to your bank account, even for Pay on Delivery orders, every 7 days.</p>
                            </div>

                        </Grid>
                    </Grid>
                </Container>

            </div>

            <div className='div-requirements'>

                <Container style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }} maxWidth='md'>
                    <hr style={{ backgroundColor: 'black', width: '100%' }} />
                    <div className='requirements-to-sell' > <h1 >Requirements to Sell</h1></div>
                    <hr style={{ backgroundColor: 'black', width: '100%' }} />

                    <Grid container spacing={10}>
                        <Grid item key='1' xs={12} sm={12} md={6} style={{ textAlign: 'center' }}>
                            <div className='icon-div'>
                                <ContactMailIcon className='my-icons' />
                                <h2 >Your GST Number & PAN information</h2>
                            </div>
                        </Grid>
                        <Grid item key='2' xs={12} sm={12} md={6} style={{ textAlign: 'center' }} >
                            <div className='icon-div'>
                                <AccountBalanceIcon className='my-icons' />
                                <h2>An active bank account for payments</h2>
                            </div>

                        </Grid>
                    </Grid>

                    <Button
                        className='start-sell-btn'
                        onClick={onClickHandler} >   Start Selling
                    </Button>

                </Container>

            </div>

        </div >
    )
}

const mapStateToProps = (state) => ({
    user: state.signin.data
})



export default connect(mapStateToProps, null)(Seller)
