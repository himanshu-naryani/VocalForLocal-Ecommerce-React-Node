import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import CartImage from "./CartImage";
import Quantity from "./Quantity";
import DeleteItem from "./DeleteItem";
import { subTotal } from "../../Redux/Actioncreators/SubTotalAction";
import { useHistory } from "react-router-dom";
import "./Cart.scss";

function CartItem(props) {
  let cart = {};

  if (props.user.data && props.user.data.userdata)
    cart = props.user.data.userdata.userCart;
  let quantity = 0;
  if (props.product && props.product.productQuantity)
    quantity = props.product.productQuantity;

  const [product, setProduct] = useState({});
  useEffect(() => {
    if (props.product && props.product.productId)
      axios
        .get("/product/" + props.product.productId)
        .then((response) => {
          setProduct(response.data[0]);
        })
        .catch((err) => console.log(err));
  }, []);

  if (Object.keys(product).length !== 0)
    props.sendDetails("prod" + product.productId, {
      quantity: props.product.productQuantity,
      price: product.productPrice,
      available: product.quantityAvailable,
    });

  useEffect(() => {
    props.sendDetails("prod" + product.productId, {
      quantity: quantity,
      price: product.productPrice,
      available: product.quantityAvailable,
    });
  }, [quantity]);

  const history = useHistory();
  const goToProduct = () => {
    history.push("/product?value=" + product.productId);
  };

  return (
    <div style={{ marginTop: "2%" }}>
      <Card style={{ height: "auto" }}>
        <Grid container>
          <Grid item xs={12} sm={6} md={3}>
            {Object.keys(product).length !== 0 ? (
              <CartImage onClick={goToProduct} pic={product.productImages[0]} />
            ) : (
              <Skeleton
                animation="wave"
                style={{ height: "10vw", margin: "2%" }}
                variant="rect"
              />
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Grid item xs={12}>
              <Box
                display={{ xs: "block", sm: "block", md: "none", lg: "none" }}
              >
                <DeleteItem productId={product.productId} />{" "}
              </Box>
              {Object.keys(product).length !== 0 ? (
                <Typography
                  variant="h6"
                  onClick={goToProduct}
                  className="productname-cartitem gotoproduct-cartitem"
                >
                  {product.productName}
                </Typography>
              ) : (
                <Skeleton
                  style={{ height: "10px", marginTop: "5%" }}
                  variant="rect"
                  width={"60%"}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {Object.keys(product).length !== 0 ? (
                <Typography className="productcategory-cartitem">
                  {product.productCategory || "Hand-made"}
                </Typography>
              ) : (
                <Skeleton
                  style={{ height: "10px", marginTop: "5%" }}
                  variant="rect"
                  width={"60%"}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <Box
                display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
              >
                {Object.keys(product).length !== 0 ? (
                  <Rating
                    className="rating-cartitem"
                    name="read-only"
                    value={product.productRating}
                    readOnly
                  />
                ) : (
                  <Skeleton
                    style={{ height: "15px", marginTop: "15%" }}
                    variant="rect"
                    width={"60%"}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                display={{ xs: "block", sm: "block", md: "none", lg: "none" }}
              >
                {Object.keys(product).length !== 0 ? (
                  <Rating
                    style={{ margin: "1% 0 0 5%" }}
                    name="read-only"
                    value={product.productRating}
                    readOnly
                  />
                ) : (
                  <Skeleton
                    style={{ height: "15px", marginTop: "15%" }}
                    variant="rect"
                    width={"60%"}
                  />
                )}
              </Box>
            </Grid>

            <Grid item>
              <Box
                display={{ xs: "block", sm: "block", md: "none", lg: "none" }}
              >
                {Object.keys(product).length !== 0 ? (
                  <Quantity
                    quantity={quantity}
                    productId={product.productId}
                    available={product.quantityAvailable}
                  />
                ) : (
                  <Skeleton
                    style={{ height: "10px", marginTop: "5%" }}
                    variant="rect"
                    width={"20%"}
                  />
                )}
              </Box>
            </Grid>

            <Grid item md={3}>
              <Box
                display={{ xs: "block", sm: "block", md: "none", lg: "none" }}
              >
                {Object.keys(product).length !== 0 ? (
                  <Typography className="productcategory-cartitem">
                    Total : &#8377;{" "}
                    {props.product.productQuantity * product.productPrice}
                  </Typography>
                ) : (
                  <Skeleton
                    style={{ height: "10px", marginTop: "5%" }}
                    variant="rect"
                    width={"20%"}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Grid container style={{ marginTop: "2%" }}>
              <Grid item md={3} style={{ marginLeft: "9%" }}>
                <Box
                  display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
                >
                  {Object.keys(product).length !== 0 ? (
                    <Typography className="productcategory-cartitem">
                      &#8377; {product.productPrice}
                    </Typography>
                  ) : (
                    <Skeleton
                      style={{ height: "10px", marginTop: "5%" }}
                      variant="rect"
                      width={"20%"}
                    />
                  )}
                </Box>
              </Grid>

              <Grid item md={3} style={{ marginLeft: "7%" }}>
                <Box
                  display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
                >
                  {Object.keys(product).length !== 0 ? (
                    <Quantity
                      quantity={quantity}
                      productId={product.productId}
                      available={product.quantityAvailable}
                    />
                  ) : (
                    <Skeleton
                      style={{ height: "10px", marginTop: "5%" }}
                      variant="rect"
                      width={"20%"}
                    />
                  )}
                </Box>
              </Grid>

              <Grid item md={3} style={{ marginLeft: "7%" }}>
                <Box
                  display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
                >
                  {Object.keys(product).length !== 0 ? (
                    <Typography className="productcategory-cartitem">
                      &#8377;{" "}
                      {props.product.productQuantity * product.productPrice}
                      <DeleteItem productId={product.productId} />{" "}
                    </Typography>
                  ) : (
                    <Skeleton
                      style={{ height: "10px", marginTop: "5%" }}
                      variant="rect"
                      width={"20%"}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.signin.data,
});

const mapDispatchToProps = (dispatch) => ({
  sendDetails: (id, obj) => dispatch(subTotal(id, obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
