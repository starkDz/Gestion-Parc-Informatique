
import React,{ forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog,AppBar,Toolbar,IconButton,Slide,Container,Fab } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import VerticalLinearStepper from './Form_Add_Article';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { url } from '../../defaults/default';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Cookies from 'universal-cookie';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

import MaterialTable from 'material-table';
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
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
axios.defaults.baseURL = url;
const tableIcons = {
  Add: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />)
};
const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  fateh: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(3),

  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    columns: [
      { title: "Type d'article", field: 'Type' ,width:"20%" },
      { title: "Observation",field: 'observation',width:"50%" },
      { title: "id", field: 'article' ,width:"10%" },
    ],
    data:[]
  });
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const demoMethod= () => {

   }
  const handleClose = () => {
    setOpen(false);
  };
  const cookies = new Cookies();

  const [formData, setFormData] = React.useState({
    Marques:[{}],
    Models:[{}],
    Categories:[{}],
    Types:[{}],
    Mode_Consommations:[{}],
    Etats:[{}],
    Couleurs:[{}],
    type: '',
    model_: '',
    mode_consommation: '',
    marque: '',
    categorie:'',
    observation: '/',
    qte_seuil: 0,
    color: '',
    mesure_unit: "",
    etat:'',
    annee_expiration: 0,
    num_kit: "",
    num_serie: "/",
    num_ref: "/"
  });
  const {
    Marques,
    Models,
    Categories,
    Types,
    Mode_Consommations,
    Etats,
    Couleurs,
    type,
    model_,
    mode_consommation,
    color,
    qte_seuil,
    observation,
    marque,
    mesure_unit,
    num_ref,
    num_serie,
    num_kit,
    annee_expiration,
    etat,
    categorie
  } = formData;
  const onChange = e=> setFormData({
    ...formData,[e.target.name]:e.target.value
  });
  const send = async e => {
    e.preventDefault();
    const element={
      type,
      model_,
      mode_consommation,
      marque,
      categorie,
      observation,
      qte_seuil,
      color,
      mesure_unit,
      etat,
      annee_expiration,
      num_kit,
      num_serie,
      num_ref
    };

    try{
      const body = JSON.stringify(element);
      const res = await axios.post('/api/article',body,{headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "x-auth-token":cookies.get('token'),
      }});
      setAlert("Ajoute d'un nouveau element a ete effectue avec Success",'success');
      const type = await axios.get('/api/type/'+res.data.type,body,{headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "x-auth-token":cookies.get('token'),
      }});
      props.sendData(res.data._id,type.data.description_Fr);
      setFormData({
        ...formData,type: '',
        model_: '',
        mode_consommation: '',
        marque: '',
        categorie:'',
        observation: '/',
        qte_seuil: 0,
        color: '',
        mesure_unit: "",
        etat:'',
        annee_expiration: 0,
        num_serie: "/",
        num_ref: "/"
      });
    }catch(err){
      setAlert(err.response.data.errors[0].msg,'error');
    }


  }
  const fill_Type = async e =>{
    e.preventDefault();
    await axios
        .get('/api/type')
        .then(response => {
          setFormData({
            ...formData,Types:response.data
          });
        })
        .catch(error => console.log(error.response));
  }
  const fill_Marque = async e =>{
    e.preventDefault();
    await axios
        .get('/api/marque')
        .then(response => {
          setFormData({
            ...formData,Marques:response.data
          });
        })
        .catch(error => console.log(error.response));
  }

  return (
    <div>
      <Fab onClick={handleClickOpen} variant="extended" color="primary"  aria-label="Ajouter un Vehicule" className={classes.fateh}>
        <AddIcon  />
        <LaptopMacIcon fontSize='large' />
      </Fab>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Ajouter un Article
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <div className={classes.root} >
          <div className={classes.toolbar} />
            <Grid container justify="center" spacing={2} lg={12}>
              <Grid item xs={12} sm={12} lg={4}>
                <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
                   <InputLabel id="demo-simple-select-outlined-label">Type d'article</InputLabel>
                   <Select
                     label="Type d'article"
                     name='type'
                     value={type}
                     onChange={e => onChange(e)}
                     onOpen={e => fill_Type(e)}
                   >
                   {Types.map((option) => (<MenuItem  value={option._id}>{option.description_Fr}</MenuItem>))}
                   </Select>
                 </FormControl>
             </Grid>
              <Grid item xs={12} sm={12} lg={4}>
                <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
                   <InputLabel id="demo-simple-select-outlined-label">Marque</InputLabel>
                   <Select

                     label="Marque"
                     name='marque'
                     value={marque}
                     onChange={e => onChange(e)}
                     onOpen={e => fill_Marque(e)}
                   >
                   {Marques.map((option) => (<MenuItem key={option._id} value={option._id}>{option.description_Fr}</MenuItem>))}
                   </Select>
                 </FormControl>
               </Grid>

                   <Grid item xs={12} sm={12} lg={3}>
                     <TextField
                      label="Numero de reference"
                      placeholder="Numero de reference"
                      helperText=""
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      name='num_ref'
                      value={num_ref}
                      onChange={e => onChange(e)}
                    />
                   </Grid>
                   <Grid item xs={12} sm={12} lg={3}>
                     <TextField
                      label="Numero de Serie"
                      placeholder="Numero de Serie"
                      helperText=""
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      name='num_serie'
                      value={num_serie}
                      onChange={e => onChange(e)}
                    />
                   </Grid>
                   <Grid item xs={12} sm={12} md={12} lg={12} >
                     <MaterialTable
                       icons={tableIcons}
                       title="Liste des articles a distribuer"
                       options={{
                         exportButton: true,
                         pageSize:5,
                         pageSizeOptions:[5, 10, 20,50,100],
                         headerStyle: {
                           backgroundColor: '#3f51b5',
                           color: '#FFF'
                         }
                       }}
                         columns={state.columns}
                         data={state.data}
                         editable={{
                           onRowUpdate: (newData, oldData) =>
                             new Promise((resolve) => {
                               setTimeout(() => {
                                 resolve();
                                 if (oldData) {
                                   setState((prevState) => {
                                     const data = [...prevState.data];
                                     data[data.indexOf(oldData)] = newData;
                                     return { ...prevState, data };
                                   });
                                 }
                               }, 600);
                             }),
                           onRowDelete: (oldData) =>
                             new Promise((resolve) => {
                               setTimeout(() => {
                                 resolve();
                                 setState((prevState) => {
                                   const data = [...prevState.data];
                                   data.splice(data.indexOf(oldData), 1);
                                   return { ...prevState, data };
                                 });
                               }, 600);
                             }),
                         }}
                       />
                   </Grid>
           </Grid>
          </div>
        </Container>
      </Dialog>
    </div>
  );
}
