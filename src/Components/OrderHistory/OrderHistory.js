import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";

import axios from "axios";

import Rating from "../Rating/Rating";

function OrderHistory(props) {
  const [product, setProduct] = useState({});
  const quantity = props.product.productQuantity;
  const productId = props.product.productId;

  useEffect(() => {
    axios
      .get("/product/" + productId)
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch();
  }, []);

  return (
    <div style={{ marginTop: "2%" }}>
      <div
        style={{ height: "auto%", marginBottom: "-6%" }}
        className="box-card"
      >
        <Grid container style={{ border: "0px solid transparent" }}>
          <Grid item xs={12} sm={6} md={3}>
            {product.productImages ? (
              <img
                src={product.productImages[0]}
                className="productimage-orderitem"
              />
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
              {Object.keys(product).length !== 0 ? (
                <Typography variant="h6" className="productname-orderitem">
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
                <Typography className="productcategory-orderitem">
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
                    className="rating-orderitem"
                    name="read-only"
                    rating={product.averageRating}
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
                    rating={product.averageRating}
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
          </Grid>

          <Grid container xs={12} sm={6} md={6} style={{ marginTop: "2%" }}>
            <Grid item md={3} style={{ marginLeft: "9%" }}>
              <Box
                display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
              >
                {Object.keys(product).length !== 0 ? (
                  <Typography className="productcategory-orderitem">
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
                display={{ xs: "block", sm: "block", md: "none", lg: "none" }}
              >
                <label>Quantity</label>
              </Box>
              <Box
                display={{ xs: "block", sm: "block", md: "block", lg: "block" }}
              >
                {Object.keys(product).length !== 0 ? (
                  <Typography
                    className="productcategory-orderitem"
                    style={{ marginLeft: "20%" }}
                  >
                    {quantity}
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
                display={{ xs: "block", sm: "block", md: "none", lg: "none" }}
              >
                <label>Total Price</label>
              </Box>
              <Box
                display={{ xs: "block", sm: "block", md: "block", lg: "block" }}
              >
                {Object.keys(product).length !== 0 ? (
                  <Typography className="productcategory-orderitem">
                    &#8377;{product.productPrice * quantity}
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
      </div>
    </div>
  );
}

export default OrderHistory;
