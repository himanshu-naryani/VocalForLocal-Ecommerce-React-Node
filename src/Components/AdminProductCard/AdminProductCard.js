import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Button from "@material-ui/core/Button";

import axios from "axios";
import ImageCarousel from "./ImageCarousel";

export default function AdminProductCard(props) {
  const [user, setUser] = useState({});
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (props.product)
      axios
        .get("/userDetails/" + props.product.sellerEmailId)
        .then((response) => {
          setUser(response.data[0]);
        }, setCheck(true))
        .catch((err) => console.log(err));
  }, []);

  return (
    <div className="divclass" style={{ paddingTop: "2%", marginLeft: "15%" }}>
      <Card>
        <Card.Body>
          <ImageCarousel
            key={props.product ? props.product.productId : "No Id"}
            images={
              props.product
                ? props.product.productImages
                : ["https://static.thenounproject.com/png/340719-200.png"]
            }
          />
          <Card.Title>
            {props.product ? props.product.productName : "Undefined"}
          </Card.Title>
          <Card.Text>
            <strong>
              Rs. {props.product ? props.product.productPrice : "Undefined"}
            </strong>
          </Card.Text>
          <Card.Text>
            {props.product
              ? props.product.productDescription
              : "No information"}
          </Card.Text>
          {check && user && user.userName && user.userMobile && user.userState && (
            <Card.Text>
              <strong>Seller Details : </strong>
              {user.userName || "undefied"},{user.userMobile||"undefined"},{user.userState || "India"}
            </Card.Text>
          )}
        </Card.Body>
        <Card.Body>
          <div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                marginLeft: "7%",
                backgroundColor: "red",
                float: "left",
              }}
              onClick={() => props.status(props.product.productId, false)}
            >
              Decline
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                marginRight: "7%",
                backgroundColor: "green",
                float: "right",
              }}
              onClick={() => props.status(props.product.productId, true)}
            >
              Approve
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
