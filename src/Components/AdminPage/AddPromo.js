import React from 'react'
import { Formik, Field, Form } from 'formik';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import * as Yup from 'yup';
import './admin.scss'
const AddPromo = () => {

    const PromoSchema = Yup.object().shape({
        promoCode: Yup.string()
          .min(2, 'Too Short!')
          .max(20, 'Too Long!')
          .required('Promo cannot be empty!!'),

        amount : Yup.number()
        .required('Amount cannot be empty!!')              
      });

      return (<div  className="addpromo-admin">
    <h1 style={{marginLeft:"20%"}}>Add Promo</h1>
    <Formik
    validationSchema={PromoSchema}
      initialValues={{
        promoCode: '',
        amount: '',
      }}
      onSubmit={async (values) => {
    
        let code = values.promoCode.toUpperCase()
       
        axios
        .post('/promo/addpromo' , {promoCode: code, amount:values.amount})
        .then((res)=>{

        })
        .catch((err)=>{
            console.log("Error Occured while adding the promocode")
        })

        values.promoCode =''
        values.amount = ''
        
      }}
    >
        {({ errors, touched }) => (
      <Form>
          <Grid container>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <label htmlFor="promoCode">Promocode : </label>
                <Field  type="name" id="promoCode" name="promoCode" placeholder="Promo title" />
                {errors.promoCode && touched.promoCode ? (
                        <span style={{color:"red" , fontSize:"0.75rem"}}>{errors.promoCode}</span>
                    ) : null}
            </Grid>

            <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <label htmlFor="amount">Amount (&#8377;) :</label>
                <Field min="1" type="number" id="amount" name="amount" placeholder="Amount in Rs" />
                {errors.amount && touched.amount ? (
                        <span style={{color:"red" , fontSize:"0.75rem" }}> {errors.amount}</span>
                    ) : null}
         </Grid>
   <Grid item xs={4} md={3}></Grid>
         <Grid item xs={6}>
        <Button type="submit" variant="contained" color="primary">Add Promo</Button>
        </Grid>
    
        </Grid>
      </Form>
      )}
    </Formik>
  </div>
  )
}


export default AddPromo
