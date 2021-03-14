import Divider from "@material-ui/core/Divider";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import Typography from "@material-ui/core/Typography";
import SellNow from "../SellNow/SellNow";
import SellerProducts from "../SellerProducts/SellerProducts";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [showProducts, setShowProducts] = useState(true); //true

  const handleCLick = (e) => {
    if (e) {
      setShowProducts(true);
    } else {
      setShowProducts(false);
    }
  };
  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <Typography style={{ margin: "8% 0 8% 5%", fontSize: "1.25rem" }}>
        <strong>Welcome User</strong>
        <ArrowBackIosIcon style={{ float: "left" }} />
      </Typography>
      <Divider />
      <List>
        {["My Products"].map((text, index) => (
          <ListItem
            className="sideitems"
            onClick={() => handleCLick(true)}
            button
            key={text}
          >
            <ListItemIcon>
              <ShoppingCartIcon style={{ fill: "red" }} />
            </ListItemIcon>
            <ListItemText className="textclass" primary={text} />
          </ListItem>
        ))}
        {["Sell Now"].map((text, index) => (
          <ListItem
            className="sideitems"
            onClick={() => handleCLick(false)}
            button
            key={text}
          >
            <ListItemIcon>
              <PlayCircleOutlineIcon style={{ fill: "blue" }} />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("left", true)}>
        <MenuIcon />
      </Button>
      <Drawer
        BackdropProps={{ invisible: true }}
        open={state.left}
        onClose={toggleDrawer("left", false)}
      >
        {sideList("left")}
      </Drawer>
      {showProducts ? <SellerProducts /> : <SellNow />}
    </div>
  );
}
