import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles ,withStyles} from '@material-ui/core/styles';
import { Dialog,AppBar,Toolbar,IconButton,Typography,Slide,Container,Fab } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import DescriptionIcon from '@material-ui/icons/Description';
import clsx from 'clsx';
import VerticalLinearStepper from './Form_Add';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Cookies from 'universal-cookie';
import { url } from '../../defaults/default';

axios.defaults.baseURL = url;
const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  fateh: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(3),

  },
  toolbar: theme.mixins.toolbar,
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  table: {
    minWidth: 700,
  },
}));
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
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function SimpleContainer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const cookies = new Cookies();
  axios
      .get('/api/document/'+props.identifier)
      .then(response => {
        const document = JSON.stringify(response.data);
        console.log(document);
        cookies.set('document', document, { path: '/'/*, expires: d*/ });
      })
      .catch(error => console.log(error.response));
  return (
    <React.Fragment>
      <CssBaseline />
<div className={classes.toolbar} />
<div className={classes.toolbar} />
<Grid container lg={12} spacing={10}>
        <Grid container  spacing={5} lg={12}>
            <Grid item xs={12} sm={12} lg={4}>
              <TextField
                   id="outlined-read-only-input"
                   label="Numero de Document :"
                   fullWidth
                   defaultValue={cookies.get('document').num_document}
                   InputProps={{
                     readOnly: true,
                   }}
                   variant="outlined"
                 />
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
                <TextField
                     id="outlined-read-only-input"
                     label="Type de Document :"
                     fullWidth
                     defaultValue={cookies.get('document').code_type_doc.description_Fr}
                     InputProps={{
                       readOnly: true,
                     }}
                     variant="outlined"
                   />
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
                <TextField
                     id="outlined-read-only-input"
                     label="Type de mouvement :"
                     fullWidth
                     defaultValue={cookies.get('document').code_type_mouv.description_Fr}
                     InputProps={{
                       readOnly: true,
                     }}
                     variant="outlined"
                   />
            </Grid>
            <Grid item xs={12} sm={12} lg={7}>
                <TextField
                     id="outlined-read-only-input"
                     label="Service Ancienne :"
                     fullWidth
                     defaultValue={cookies.get('document').code_service_anc.description_Fr}
                     InputProps={{
                       readOnly: true,
                     }}
                     variant="outlined"
                   />

            </Grid>
            <Grid item xs={12} sm={12} lg={7}>
                <TextField
                     id="outlined-read-only-input"
                     fullWidth
                     label="  Service de distribution :"
                     defaultValue={cookies.get('document').code_service_dist.description_Fr}
                     InputProps={{
                       readOnly: true,
                     }}
                     variant="outlined"
                   />

            </Grid>
            <Grid item xs={12} sm={12} lg={7}>
                <TextField
                     id="outlined-read-only-input"
                     fullWidth
                     label=" Service destinatrice :"
                     defaultValue= {cookies.get('document').code_service_dest.description_Fr}
                     InputProps={{
                       readOnly: true,
                     }}
                     variant="outlined"
                   />
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
                <TextField
                     id="outlined-read-only-input"
                     label="Observation :"
                     fullWidth
                     defaultValue=  {cookies.get('document').observation}
                     InputProps={{
                       readOnly: true,
                     }}
                     variant="outlined"
                   />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
                <TextField
                     id="outlined-read-only-input"
                     fullWidth
                     label="La personne qui a signe le document :"
                     defaultValue=  {cookies.get('document').matricule_per_sign}
                     InputProps={{
                       readOnly: true,
                     }}
                     variant="outlined"
                   />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
                <TextField
                  fullWidth
                     id="outlined-read-only-input"
                     label="  La personne qui utilise le materiel :"
                     defaultValue= {cookies.get('document').matricule_per_use}
                     InputProps={{
                       readOnly: true,
                     }}
                     variant="outlined"
                   />

            </Grid>
        </Grid>
        <Grid container  lg={12}>
            <Grid item xs={12} sm={12} lg={12}>
              <div className={classes.toolbar} />
              <TableContainer component={Paper}>
                 <Table className={classes.table} aria-label="customized table">
                   <TableHead>
                     <TableRow>
                       <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                       <StyledTableCell align="right">Calories</StyledTableCell>
                       <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                       <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                       <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                     </TableRow>
                   </TableHead>
                   <TableBody>
                     {rows.map((row) => (
                       <StyledTableRow key={row.name}>
                         <StyledTableCell component="th" scope="row">
                           {row.name}
                         </StyledTableCell>
                         <StyledTableCell align="right">{row.calories}</StyledTableCell>
                         <StyledTableCell align="right">{row.fat}</StyledTableCell>
                         <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                         <StyledTableCell align="right">{row.protein}</StyledTableCell>
                       </StyledTableRow>
                     ))}
                   </TableBody>
                 </Table>
               </TableContainer>
               <div className={classes.toolbar} />
            </Grid>
        </Grid>
</Grid>

    </React.Fragment>
  );
}
