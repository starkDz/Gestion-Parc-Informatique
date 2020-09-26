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
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
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

import DescriptionIcon from '@material-ui/icons/Description';
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
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(styles);
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(Article, Quantite) {
  return { Article, Quantite };
}

const rows = [
  createData('Frozen yoghurt', 1),
  createData('Ice cream sandwich', 0),
  createData('Eclair', 2),
  createData('Cupcake', 2),
  createData('Gingerbread', 3),
  createData('Ice cream sandwich', 0),
  createData('Eclair', 2),
  createData('Cupcake', 1),
  createData('Gingerbread', 1),
  createData('Ice cream sandwich', 2),
  createData('Eclair', 3),
  createData('Cupcake', 1),
  createData('Gingerbread', 5),
];

const Home = () => {
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
      <Grid container lg={9}>
        <GridItem xs={12} sm={6} md={6} lg={4} height={100}>
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
                <DateRange />
                Magasin N°1
              </div>
            </CardFooter>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Magasin N°2
              </div>
            </CardFooter>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Magasin N°3
              </div>
            </CardFooter>
            <CardFooter stats>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <DescriptionIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Document de distribution</p>
              <h1 className={classes.cardTitle}>{countData.NumberDocument}</h1>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Magasin N°1
              </div>
            </CardFooter>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Magasin N°2
              </div>
            </CardFooter>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Magasin N°3
              </div>
            </CardFooter>
            <CardFooter stats>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="warning">
                <DescriptionIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Documents d'entrer</p>
              <h1 className={classes.cardTitle}>{countData.NumberDocument_Entre}</h1>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Magasin N°1
              </div>
            </CardFooter>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Magasin N°2
              </div>
            </CardFooter>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Magasin N°3
              </div>
            </CardFooter>
            <CardFooter stats>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={12}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="warning">
                <DescriptionIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Documents d'entrer</p>
              <h1 className={classes.cardTitle}>{countData.NumberDocument_Entre}</h1>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Magasin N°1
              </div>
            </CardFooter>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Magasin N°2
              </div>
            </CardFooter>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Magasin N°3
              </div>
            </CardFooter>
            <CardFooter stats>
            </CardFooter>
          </Card>
        </GridItem>
      </Grid>
      <Grid container  lg={3} >

        <GridItem xs={12} sm={6} md={6} lg={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Article</StyledTableCell>
                  <StyledTableCell align="right">Quantite</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.Article}>
                    <StyledTableCell component="th" scope="row">
                      {row.Article}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.Quantite}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </GridItem>
      </Grid>
      </Grid>
  );
}
export default Home;
