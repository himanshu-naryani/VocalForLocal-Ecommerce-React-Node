
import Divider from '@material-ui/core/Divider';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Typography from '@material-ui/core/Typography';
import TransferAdmin from '../TransferAdmin/TransferAdmin'
import ProductApprovals from '../ProductApprovals/ProductApprovals'
import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RedeemIcon from '@material-ui/icons/Redeem';
import AddPromo from './AddPromo'
import ShowPromos from './ShowPromos'
import ViewModuleIcon from '@material-ui/icons/ViewModule';

const useStyles = makeStyles({
  list: {
    width: 250
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });
  const [showProducts , setShowProducts] = useState(true) 
  const [promo , setPromo] = useState(false)
  const [showPromo , setShowPromo] = useState(false)
  const handleCLick = (e)=>{
    setPromo(false)
    setShowPromo(false)       
    if(e){
        setShowProducts(true)

    }
    else{
        setShowProducts(false)
    }
  }
  const toggleDrawer = (side, open) => event => {

    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
<Typography style={{margin:"8% 0 8% 5%" , fontSize:"1.25rem" }}><strong>Welcome User</strong><ArrowBackIosIcon style={{float:"left"}}/></Typography>
      <Divider />
      <List>
         {['Pending Products'].map((text, index) => (
          <ListItem className="sideitems" onClick={()=>handleCLick(true)}  button key={text}>
            <ListItemIcon><ShoppingCartIcon style={{fill:"red"}}/></ListItemIcon>
            <ListItemText className="textclass" primary={text} />
          </ListItem>
        ))}
        {['Transfer Admin'].map((text, index) => (

          <ListItem  className="sideitems" onClick={()=>handleCLick(false)} button  key={text}>
            <ListItemIcon><PlayCircleOutlineIcon style={{fill:"green"}} /></ListItemIcon>
            <ListItemText  primary={text} />
          </ListItem>

        ))}
            {['Add Promocode'].map((text, index) => (
          <ListItem  className="sideitems" onClick={()=>{setPromo(true) ;setShowPromo(false)}} button  key={text}>
            <ListItemIcon><RedeemIcon style={{fill:"blue"}} /></ListItemIcon>
            <ListItemText  primary={text} />
          </ListItem>

        ))}
          {['View Promocodes'].map((text, index) => (
          <ListItem  className="sideitems" onClick={()=>setShowPromo(true)} button  key={text}>
            <ListItemIcon><ViewModuleIcon style={{fill:"brown"}} /></ListItemIcon>
            <ListItemText  primary={text} />
          </ListItem>

        ))}
      </List>
    </div>
  );

  return (
    <div >  
     
      <Button onClick={toggleDrawer("left", true)} ><MenuIcon/></Button>
      <Drawer
        BackdropProps={{ invisible: true }}
        open={state.left}
        onClose={toggleDrawer("left", false)}
      >
        {sideList("left")}
      </Drawer>
      {!showPromo && !promo && (showProducts?<ProductApprovals/>:<TransferAdmin/>)}
      {!showPromo && promo && <AddPromo />}
      {showPromo && <ShowPromos />}

    </div>
  );
}




