import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import Rating from "../Rating/Rating";
import DeleteModal from "../../Shared/DeleteModal/DeleteModal";
import StatusButton from "./StatusButton";
import axios from "axios";
import SellerFAQ from "./SellerFAQ";
import TextField from "@material-ui/core/TextField";
import StatusBar from "../../Shared/SnackBars/SuccessSnackBar";
import "./SellerProductCard.css";

export default function SellerProductCard(props) {
  const classes = useStyles();

  const [products, setProducts] = useState(props.sellerProducts);
  const [modalShow, setModalShow] = React.useState(false);
  const [latest, setLatest] = React.useState("");
  const [latestEdit, setLatestEdit] = React.useState("");
  const [editBody, setEditBody] = React.useState({
    productId: "",
    price: "",
    quantity: "",
  });
  const [snackBarStatus, setSnackBarStatus] = React.useState({
    status: "",
    severity: "",
  });
  const handleEditEvent = (event) => {
    const { name, value } = event.target;
    setEditBody({
      ...editBody,
      productId: latestEdit.productId,
      [name]: value,
    });
  };
  const updateProductDetails = (id) => {
    setLatestEdit("");
    axios
      .patch("/seller/updateproduct", editBody)
      .then((res) => {
        const updatedProducts = products.map((product) => {
          if (product.productId === editBody.productId) {
            product.productPrice = editBody.price;
            product.quantityAvailable = editBody.quantity;
          }
          setSnackBarStatus({
            status: "Succesfully Edited the fields. Have a great day!!",
            severity: "success",
          });
          return product;
        });
        setProducts(updatedProducts);
      })
      .catch((err) => {
        setSnackBarStatus({
          status: "Error while updating the fields! Please try again",
          severity: "error",
        });
        console.log("Error Occured While Updating");
      });
    setSnackBarStatus({ status: "", severity: "" });
  };

  const yesClickHandler = () => {
    axios
      .patch("/products/removeseller?productId=" + latest.productId)
      .then((res) => {
        const updatedProducts = products.filter((product) => {
          if (product.productId !== latest.productId) return product;
          return false;
        });
        setSnackBarStatus({
          status: "Succesfully deleted the product from Selling List!!",
          severity: "success",
        });
        setProducts(updatedProducts);
      })
      .catch((err) => {
        setSnackBarStatus({
          status: "Error occured while deleting the product!!",
          severity: "success",
        });
      });
    setModalShow(false);
    setSnackBarStatus({ status: "", severity: "" });
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={2}>
            {products &&
              products.map((product) => (
                <Grid
                  item
                  key={product.productId}
                  id={product.productId}
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <div className="sellerproductCardBoxShadow">
                    <Card className={classes.card}>
                      <ImageCarousel images={product.productImages} />
                      <CardContent className={classes.cardContent}>
                        <Typography
                          style={{ fontSize: "1.5em", fontWeight: "1000" }}
                          gutterBottom
                          variant="h4"
                          component="h1"
                        >
                          {product.productName}
                        </Typography>
                        <Typography
                          gutterBottom
                          style={{ fontSize: "1em" }}
                          variant="h6"
                          component="h2"
                        >
                          Rs.{" "}
                          {!(latestEdit.productId === product.productId) ? (
                            product.productPrice
                          ) : (
                            <TextField
                              onChange={(event) => {
                                handleEditEvent(event);
                              }}
                              name="price"
                              style={{
                                width: "30%",
                                float: "right",
                                marginRight: "20%",
                              }}
                              id="standard-number"
                              defaultValue={product.productPrice}
                              type="number"
                              InputProps={{ inputProps: { min: 1, max: 1000 } }}
                            />
                          )}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          style={{ fontSize: "1em" }}
                          component="h6"
                        >
                          Quantity Sold : {product.quantitySold}
                        </Typography>
                        <Typography
                          gutterBottom
                          style={{ fontSize: "1em" }}
                          variant="h6"
                          component="h6"
                        >
                          {!(latestEdit.productId === product.productId) &&
                            (product.quantityAvailable
                              ? "Quantity Available : " +
                                product.quantityAvailable
                              : "Product Demand : " +
                                product.productRequestCount)}
                          {latestEdit.productId === product.productId &&
                            "New Quantity"}
                          {latestEdit.productId === product.productId && (
                            <TextField
                              style={{
                                width: "30%",
                                float: "right",
                                marginRight: "20%",
                              }}
                              onChange={(event) => handleEditEvent(event)}
                              name="quantity"
                              id="standard-number"
                              defaultValue={product.quantityAvailable}
                              type="number"
                              InputProps={{ inputProps: { min: 0, max: 1000 } }}
                            />
                          )}
                        </Typography>

                        <Typography gutterBottom variant="h6" component="h6">
                          <Rating rating={product.averageRating} />
                          {product.approvalDate ? (
                            <StatusButton mycolor="green" status="Approved" />
                          ) : product.isRejected ? (
                            <StatusButton mycolor="red" status="Rejected" />
                          ) : (
                            <StatusButton mycolor="yellow" status="Pending" />
                          )}
                        </Typography>
                      </CardContent>

                      <CardActions>
                        <Button
                          size="medium"
                          style={{ color: "red", marginRight: "20%" }}
                          onClick={() => {
                            if (!(latestEdit.productId === product.productId)) {
                              setModalShow(true);
                              setLatest(product);
                            } else {
                              setLatestEdit("");
                            }
                          }}
                        >
                          {!(latestEdit.productId === product.productId) ? (
                            <DeleteForeverIcon />
                          ) : (
                            <p>Cancel</p>
                          )}
                        </Button>

                        <Button
                          size="medium"
                          style={{ color: "blue", marginLeft: "30%" }}
                          onClick={() => {
                            if (!(latestEdit.productId === product.productId)) {
                              setLatestEdit(product);
                              setEditBody({
                                ...editBody,
                                productId: product.productId,
                                quantity: product.quantityAvailable,
                                price: product.productPrice,
                              });
                            } else {
                              updateProductDetails();
                            }
                          }}
                        >
                          {!(latestEdit.productId === product.productId) ? (
                            <EditIcon />
                          ) : (
                            <p>Save</p>
                          )}
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
      {modalShow && (
        <DeleteModal
          yesclick={yesClickHandler}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
      {snackBarStatus.status !== "" && (
        <StatusBar
          message={snackBarStatus.status}
          severity={snackBarStatus.severity}
        />
      )}
      <SellerFAQ />
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));
