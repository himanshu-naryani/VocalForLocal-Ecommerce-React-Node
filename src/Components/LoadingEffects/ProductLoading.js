import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 500,
    margin: theme.spacing(2),
    marginLeft:30
  },
  media: {
    height: 500,
  },
}));

function Media(props) {

  const classes = useStyles();

  return (
    <div >
      <Row md={2} sm={1} xs={1} lg={3}>
      <Col >
    <Card className={classes.card} style={{marginTop:"4%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>
    <Card className={classes.card} style={{marginBottom:"10%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>
    <Card className={classes.card} style={{marginBottom:"10%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>    <Card className={classes.card} style={{marginBottom:"10%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>    <Card className={classes.card} style={{marginBottom:"10%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>
    </Col>
    <Col >
    <Card className={classes.card} style={{marginTop:"4%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>
    <Card className={classes.card} style={{marginBottom:"10%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>
    <Card className={classes.card} style={{marginBottom:"10%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>    <Card className={classes.card} style={{marginBottom:"10%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>    <Card className={classes.card} style={{marginBottom:"10%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>
    </Col>
    <Col >
    <Card className={classes.card} style={{marginTop:"4%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>
    <Card className={classes.card} style={{marginBottom:"10%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>
    <Card className={classes.card} style={{marginBottom:"10%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>    <Card className={classes.card} style={{marginBottom:"10%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>    <Card className={classes.card} style={{marginBottom:"10%"}}>
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="100%" /> 
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            <Skeleton animation="wave" height={10} width="80%" />
    </Card>
    </Col>
    </Row>
    </div>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Facebook() {
  return (
    <div>
      <Media loading />
      <Media />
    </div>
  );
}
