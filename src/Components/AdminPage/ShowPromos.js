import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme)=>({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
  table: {
    minWidth: 650,
  },
}));

function createData(promoCode, amount) {
  return { promoCode, amount};
}


 function ShowPromos() {
  const classes = useStyles();

    const [rows , setRows] = React.useState([])
    const [empty , setEmpty] = React.useState(false)
    const [open, setOpen] = React.useState(false);

        React.useEffect(() => {
            axios 
            .get('/promo/allpromos')
            .then((res)=>{
       
                let arr = []
                for(let i=0; i<res.data.length; i++){
                    arr.push(createData(res.data[i].promoCode , res.data[i].amount))
                }
                setRows(arr)
                if(arr.length===0)
                    setEmpty(true)
            })
            .catch((err)=>{
                console.log(err.data)
            })
        }, [])

        const deleteHandler = (val)=>{
       
            setOpen(true)
            axios 
            .patch('/promo/deletepromo',{promoCode : val})
            .then((res)=>{
              
                const newArr = []
                for(let i=0; i<rows.length ; i++)
                    {
                        if(rows[i].promoCode===val)
                            continue 
                        newArr.push(rows[i])    
                    }    
                    setRows(newArr)

                setOpen(false)
            })
            .catch((err)=>{
                console.log("Unable to delete the promo at this moment")
            })
        }

  return (
      <div style={{marginBottom:"10%"}}>
    { !empty ? <Grid container>
        <Grid item xs={false} md={3}></Grid>
        <Grid item xs={12} md={6}>
            <TableContainer component={Paper}>
            <Table className={classes.table} >
                <TableHead >
                <TableRow>
                    <TableCell style={{ color: 'blue' , fontWeight:"900" ,fontSize:"1.1rem" }} >Promo Code</TableCell>
                    <TableCell style={{ color: 'blue' , fontWeight:"900" ,fontSize:"1.1rem" }} align="left">Amount in (&#8377;)</TableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow  key={row.promoCode}>
                    <TableCell  component="th" scope="row">
                        {row.promoCode}
                    </TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                    <TableCell align="left">
                        <DeleteForeverIcon style={{fill:"red"}} value={row.promoCode} onClick={()=> deleteHandler(row.promoCode) } />
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </Grid>
            <Grid item xs={false} md={3}></Grid>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
    </Grid> : <p>No promos</p>}
    </div>
  );
}

export default ShowPromos ;