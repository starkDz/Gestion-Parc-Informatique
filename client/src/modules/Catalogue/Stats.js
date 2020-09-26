import React,{ useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Provider, connect } from 'react-redux';
import store from '../../store';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { url } from '../../defaults/default';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
// core components
import DescriptionIcon from '@material-ui/icons/Description';
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Table from "../../components/Table/Table.js";
import Danger from "../../components/Typography/Danger.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Store from "@material-ui/icons/Store";
import BuildIcon from '@material-ui/icons/Build';
import styles from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";
import Icon from "@material-ui/core/Icon";
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(styles);

const Add_New = () => {
const classes = useStyles();
const [countData, setCountData] = React.useState({
  NumberArticle:0,
  NumberDocument:0,
  NumberDocument_Entre:0
});

useEffect(() => {
  async function fetchData() {
    await axios
        .get('/api/article/getCount')
        .then(response => {
          setCountData({
            NumberArticle:response.data[0],
            NumberDocument:response.data[1],
            NumberDocument_Entre:response.data[2]
          });
      }).catch(error => console.log(error.response));
  }
  fetchData();

}, []);

  return (
      <Grid container spacing={0} >
        <GridItem xs={12} sm={12} md={12} lg={4} height={100}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <LaptopMacIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Nombre des Articles</p>
              <h1 className={classes.cardTitle}>
                {countData.NumberArticle}
            </h1>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                    Get more space
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <DescriptionIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Nombre de document de distribution</p>
              <h1 className={classes.cardTitle}>{countData.NumberDocument}</h1>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="warning">
                <BuildIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Nombre des documents d'entrer</p>
              <h1 className={classes.cardTitle}>{countData.NumberDocument_Entre}</h1>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </Grid>
  );
}
export default Add_New;
