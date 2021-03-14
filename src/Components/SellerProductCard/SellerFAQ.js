import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import "./SellerProductCard.css";
export default function SellerFAQ() {
  return (
    <div className="mobile-space">
      <Typography variant="h5">Seller FAQ's</Typography>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              What is Product Demand?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Typography style={{ marginLeft: "2%", padding: "1%" }}>
              Product demand is the overall count of the users who opted for the
              particular product when it is out of stock
            </Typography>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              How is total average rating calculated?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Typography style={{ marginLeft: "2%", padding: "1%" }}>
              It is calculated as the ratio of sum of rating provide by all the
              users who purchased the product to the total number of users
              purchased
            </Typography>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              How can I add stock for a particular product?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Typography style={{ marginLeft: "2%", padding: "1%" }}>
              Click on the edit Icon below the product and you can
              increase/decrease the quantity{" "}
            </Typography>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
