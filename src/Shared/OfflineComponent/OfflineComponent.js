import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


function OfflineComponent() {
    const classes = useStyles();
    return (
        <div className={classes.root} style={{position:"sticky", top:"0",zIndex:"1"}}>
        <Alert variant="filled" severity="warning" >
        No Internet connection. Please check your Internet settings.Try refreshing the browser
      </Alert>
        </div>
    )
}

export default OfflineComponent
