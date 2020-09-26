import React from 'react';
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
  const fill_Model = async e =>{
    e.preventDefault();
    await axios
        .get('/api/model_')
        .then(response => {
          setFormData({
            ...formData,Models:response.data
          });
        })
        .catch(error => console.log(error.response));
  }
  const fill_Categorie = async e =>{
    e.preventDefault();
    await axios
        .get('/api/categorie')
        .then(response => {
          setFormData({
            ...formData,Categories:response.data
          });
        })
        .catch(error => console.log(error.response));
  }
  const fill_Mode_Consommation = async e =>{
    e.preventDefault();
    await axios
        .get('/api/mode_consommation')
        .then(response => {
          setFormData({
            ...formData,Mode_Consommations:response.data
          });
        })
        .catch(error => console.log(error.response));
  }
  const fill_Etat = async e =>{
    e.preventDefault();
    await axios
        .get('/api/etat')
        .then(response => {
          setFormData({
            ...formData,Etats:response.data
          });
        })
        .catch(error => console.log(error.response));
  }
  const fill_Couleur = async e =>{
    e.preventDefault();
    await axios
        .get('/api/color')
        .then(response => {
          setFormData({
            ...formData,Couleurs:response.data
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
        <Container maxWidth="md">
          <div className={classes.root} lg={5}>
          <div className={classes.toolbar} />
            <Grid container justify="center" spacing={2}>
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
               <Grid item xs={12} sm={12} lg={4}>
                 <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
                    <InputLabel id="demo-simple-select-outlined-label">Models</InputLabel>
                    <Select

                      label="Model"
                      name='model_'
                      value={model_}
                      onChange={e => onChange(e)}
                      onOpen={e => fill_Model(e)}
                    >
                    {Models.map((option) => (<MenuItem key={option._id}  value={option._id}>{option.description_Fr}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
                 <Grid item xs={12} sm={12} lg={4}>
                   <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
                      <InputLabel id="demo-simple-select-outlined-label">Mode de Consommations</InputLabel>
                      <Select

                        label="Mode de Consommations"
                        name='mode_consommation'
                        value={mode_consommation}
                        onChange={e => onChange(e)}
                        onOpen={e => fill_Mode_Consommation(e)}
                      >
                      {Mode_Consommations.map((option) => (<MenuItem key={option._id}  value={option._id}>{option.description_Fr}</MenuItem>))}
                      </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} lg={4}>
                  <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
                     <InputLabel id="demo-simple-select-outlined-label">Categorie</InputLabel>
                     <Select

                       label="Categorie"
                       name='categorie'
                       value={categorie}
                       onChange={e => onChange(e)}
                       onOpen={e => fill_Categorie(e)}
                     >
                     {Categories.map((option) => (<MenuItem key={option._id}  value={option._id}>{option.description_Fr}</MenuItem>))}
                     </Select>
                   </FormControl>
                 </Grid>
               <Grid item xs={12} sm={12} lg={4}>
               </Grid>
                 <Grid item xs={12} sm={12} lg={4}>
                   <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
                      <InputLabel id="demo-simple-select-outlined-label">Etat</InputLabel>
                      <Select

                        label="Etat"
                        name='etat'
                        value={etat}
                        onChange={e => onChange(e)}
                        onOpen={e => fill_Etat(e)}
                      >
                      {Etats.map((option) => (<MenuItem key={option._id}  value={option._id}>{option.description_Fr}</MenuItem>))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={4}>
                    <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
                       <InputLabel id="demo-simple-select-outlined-label">Couleur</InputLabel>
                       <Select

                         label="Couleur"
                         name='color'
                         value={color}
                         onChange={e => onChange(e)}
                         onOpen={e => fill_Couleur(e)}
                       >
                       {Couleurs.map((option) => (<MenuItem key={option._id}  value={option._id}>{option.description_Fr}</MenuItem>))}
                       </Select>
                     </FormControl>
                   </Grid>
                  <Grid item xs={12} sm={12} lg={4}>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={4}>
                     <TextField
                            label="Quantite Seuil"
                            placeholder="Quantite"
                            helperText=""
                            fullWidth
                            variant="outlined"
                            type="number"
                            name='qte_seuil'
                            value={qte_seuil}
                            onChange={e => onChange(e)}
                        />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={4}>
                  <TextField
                            label="Annee d'expiration"
                            placeholder="Annee d'expiration"
                            helperText=""
                            fullWidth
                            variant="outlined"
                            type="number"
                            name='annee_expiration'
                            value={annee_expiration}
                            onChange={e => onChange(e)}
                        />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={4}>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={3}>
                    <TextField
                     error
                     label="Numero de kit* (Obligatoire)"
                     placeholder="Numero de kit"
                     helperText=""
                     fullWidth
                     variant="outlined"
                     margin="normal"
                     name='num_kit'
                     value={num_kit}
                     onChange={e => onChange(e)}
                   />
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
                   <Grid item xs={12} sm={12} lg={3}>
                   </Grid>
                   <Grid item xs={12} sm={12} lg={12}>
                    <TextField
                     label="Observation"
                     placeholder="Observation"
                     helperText=""
                     fullWidth
                     variant="outlined"
                     name='observation'
                     value={observation}
                     onChange={e => onChange(e)}

                   />
                   </Grid>
                     <Grid item xs={12} sm={12} lg={3}>
                       <Button
                         variant="contained"
                         color="primary"
                         size="large"
                         onClick={send}
                         >
                          Ajouter un article
                       </Button>
                     </Grid>

           </Grid>
          </div>
        </Container>
      </Dialog>
    </div>
  );
}
