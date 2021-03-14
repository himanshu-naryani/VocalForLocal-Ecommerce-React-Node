
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'react-bootstrap/Image'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  wrapper: {
    width: 100 + theme.spacing(5),
  },


}));

export default function NoProducts() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Image style={{ marginLeft: "10%" }} src='https://www.kalpamritmarketing.com/design_img/no-product-found.jpg' alt="No Products to Display" size='massive' disabled />
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Typography style={{ marginLeft: "37%" }}>You are not selling any product yet!!</Typography>
      </Slide>

    </div>
  );
}
