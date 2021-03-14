import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './ProductCard.scss';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Image from "react-bootstrap/Image";
import Rating from '../Rating/Rating'
import { useHistory } from 'react-router-dom';

import AddToCartButton from './AddToCartButton';

const useStyles = makeStyles((theme) => ({

    cardGrid: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
        '@media only screen and (max-width: 600px)': {

            paddingTop: theme.spacing(5),

        }
    },
    gridCard: {

        height: '420px'

    },
    card: {
        width: '100%',
        height: '110%',
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        boxShadow: ' 5px 10px 18px #888888',
        transition: '0.2s ',



        '&:hover': {
            borderRadius: "10px",
            boxShadow: '2px 8px 10px #888888',
            transform: 'TranslateY(2px)'
        },

        '@media only screen and (max-width: 600px)': {


        },
        '& h5': {
            '@media only screen and (max-width: 600px)': {
                fontSize: 'larger',
                fontWeight: 'bold'
            }
        }

    }

}));



function ProductCard(props) {
    const classes = useStyles();
    const products = (props.products ? props.products : []);
    const history = useHistory();

    function handleClick(productId) {

        history.push(`/product?value=${productId}`);
    }


    const indianState = props.stateName;

    return (

        <main>
            <Container className={classes.cardGrid} maxWidth="md">

                <Grid container spacing={10} >

                    {(indianState === 'All States') ?

                        products.map((product) =>

                        (

                            <Grid className={classes.gridCard} item key={product.productId} id={product.productId} xs={12} sm={6} md={4} >

                                <Card className={classes.card}>

                                    <Image onClick={() => { handleClick(product.productId) }} src={product.productImages[0]} style={{ cursor: 'pointer', width: '100%', height: '50%' }} />

                                    <CardContent className={classes.cardContent}>

                                        <Typography gutterBottom variant="h5" component="h5">
                                            {product.productName}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h5">
                                            ₹{product.productPrice}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h5">
                                            <Rating rating={product.averageRating} />
                                        </Typography>
                                        <div className='btn-div'>
                                            <Link to={`/product?value=${product.productId}`}>
                                                <button className='buy-now-btn' >View</button>
                                            </Link>
                                            <AddToCartButton

                                                productId={product.productId}
                                                quantity={1}>
                                            </AddToCartButton>
                                        </div>
                                    </CardContent>

                                </Card>

                            </Grid>

                        ))


                        :

                        products.map((product) => (

                            (indianState === product.productState) ?
                                (

                                    <Grid className={classes.gridCard} item key={product.productId} id={product.productId} xs={12} sm={6} md={4} >

                                        <Card className={classes.card}>

                                            <Image onClick={() => { handleClick(product.productId) }} src={product.productImages[0]} style={{ cursor: 'pointer', width: '100%', height: '50%' }} />

                                            <CardContent className={classes.cardContent}>

                                                <Typography gutterBottom variant="h5" component="h5">
                                                    {product.productName}
                                                </Typography>
                                                <Typography gutterBottom variant="h5" component="h5">
                                                    ₹{product.productPrice}
                                                </Typography>
                                                <Typography gutterBottom variant="h5" component="h5">
                                                    <Rating rating={product.averageRating} />
                                                </Typography>
                                                <div className='btn-div'>
                                                    <Link to={`/product?value=${product.productId}`}>
                                                        <button className='buy-now-btn' >View</button>
                                                    </Link>
                                                    <AddToCartButton

                                                        productId={product.productId}
                                                        quantity={1}>
                                                    </AddToCartButton>
                                                </div>
                                            </CardContent>
                                        </Card>

                                    </Grid>

                                ) : null
                        )
                        )
                    }
                </Grid>
            </Container>
        </main >

    )
}

export default ProductCard;

