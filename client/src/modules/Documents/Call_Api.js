import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Loading_Item from './Loading_Item';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import MaterialTable from 'material-table';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { forwardRef } from 'react';
import axios from 'axios';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Container,
  Fab,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import DescriptionIcon from '@material-ui/icons/Description';
import Cookies from 'universal-cookie';
import SimpleContainer from './Details';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { url } from '../../defaults/default';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
axios.defaults.baseURL = url;
const tableIcons = {
  Add: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <AddBox {...props} ref={ref} />
  )),
  Check: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Check {...props} ref={ref} />
  )),
  Clear: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Clear {...props} ref={ref} />
  )),
  Delete: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <DeleteOutline {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Edit {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <SaveAlt {...props} ref={ref} />
  )),
  Filter: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <FilterList {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <FirstPage {...props} ref={ref} />
  )),
  LastPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <LastPage {...props} ref={ref} />
  )),
  NextPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ChevronRight {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Clear {...props} ref={ref} />
  )),
  Search: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Search {...props} ref={ref} />
  )),
  SortArrow: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ArrowUpward {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Remove {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ViewColumn {...props} ref={ref} />
  )),
};
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = (theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: 2,
    flex: 1,
  },
});
const classes = useStyles();
class Call_Api extends Component {
  constructor(props) {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      secondary: false,
      dense: false,
      type: 'success',
      selectedRow: null,
      opensnack: false,
      open: false,
      Title: 'Liste des documents de distribution',
    };
    this.DeleteThis = this.DeleteThis.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }

  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  async DeleteThis(id, index) {
    try {
      const cookie = new Cookies();
      const res = await axios.delete(url + '/api/document/' + id, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'x-auth-token': cookie.get('token'),
        },
      });
      this.setState({
        opensnack: true,
        type: 'success',
        msg: 'Suppression a ete fait avec Success ',
      });
      const { items } = this.state;
      items.splice(index, 1);
      this.setState({ items });
    } catch {
      this.setState({
        opensnack: true,
        type: 'error',
        msg: 'Erreur lors de la suppression',
      });
    }
  }
  async componentDidMount() {
    fetch(url + '/api/document_entre')
      .then((response) => response.json())
      .then(
        (res) => {
          this.setState({
            isLoaded: true,
            items: res,
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    localStorage.clear();
    const cookies = new Cookies();
    await axios
      .get('/api/type_document')
      .then((response) => {
        const typedoc = JSON.stringify(response.data);
        localStorage.setItem('typedoc', typedoc);
      })
      .catch((error) => console.log(error.response));
    await axios
      .get('/api/type_mouvement')
      .then((response) => {
        const typemouv = JSON.stringify(response.data);
        localStorage.setItem('typemouv', typemouv);
      })
      .catch((error) => console.log(error.response));
    await axios
      .get('/api/service')
      .then((response) => {
        const service = JSON.stringify(response.data);
        localStorage.setItem('service', service);
      })
      .catch((error) => console.log(error.response));
  }
  render() {
    const { classes } = this.props;
    const {
      error,
      isLoaded,
      items,
      Title,
      selectedRow,
      open,
      id,
      opensnack,
      msg,
      type,
    } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div>
          <Loading_Item />
        </div>
      );
    } else {
      return (
        <div>
          <Snackbar
            open={opensnack}
            autoHideDuration={2000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity={type}>
              {msg}
            </Alert>
          </Snackbar>
          <MaterialTable
            icons={tableIcons}
            title={Title}
            columns={[
              { title: 'Numéro', field: 'ref_document_entr', width: '8%' },
              {
                title: 'Type',
                field: 'code_type_doc.description_Fr',
                width: '8%',
              },
              {
                title: 'Mouvement',
                field: 'code_type_mouv.description_Fr',
                width: '8%',
              },
              {
                title: 'Service Dest',
                field: 'code_service_dest.description_Fr',
                width: '20%',
              },
              { title: 'Observation', field: 'observation', width: '20%' },
              { title: 'Date', field: 'date', width: '20%' },
              { title: 'Crée par', field: 'owner.name', width: '8%' },
            ]}
            data={items}
            actions={[
              {
                icon: () => <EditIcon color='primary' />,
                tooltip: 'Edit',
                onClick: (event, rowData) => alert('You saved ' + rowData._id),
              },
              {
                icon: () => <DeleteIcon color='secondary' />,
                tooltip: 'Delete',
                onClick: (event, rowData) =>
                  this.DeleteThis(rowData._id, rowData.tableData.id),
              },
              {
                icon: () => <VisibilityIcon color='primary' />,
                tooltip: 'Plus des details',
                onClick: (event, rowData) => {
                  this.handleClickOpen();
                  this.setState({ id: rowData._id });
                },
              },
            ]}
            onRowClick={(evt, selectedRow) => this.setState({ selectedRow })}
            options={{
              exportButton: true,
              pageSize: 20,
              pageSizeOptions: [5, 10, 20, 50, 100],
              sorting: true,
              filtering: true,
              grouping: true,
              rowStyle: true,
              rowStyle: (rowData) => ({
                backgroundColor:
                  this.state.selectedRow &&
                  this.state.selectedRow.tableData.id === rowData.tableData.id
                    ? '#EEE'
                    : '#FFF',
              }),
              headerStyle: {
                backgroundColor: '#3f51b5',
                color: '#FFF',
              },
            }}
          />
          <Dialog fullScreen open={open} onClose={this.handleClose}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge='start'
                  color='inherit'
                  onClick={this.handleClose}
                  aria-label='close'
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant='h6' className={classes.title}>
                  Plus de details sur ce document
                </Typography>
              </Toolbar>
            </AppBar>
            <Container minWidth='xlg'>
              <SimpleContainer identifier={id} />
            </Container>
          </Dialog>
        </div>
      );
    }
  }
}

export default withStyles(useStyles)(Call_Api);
