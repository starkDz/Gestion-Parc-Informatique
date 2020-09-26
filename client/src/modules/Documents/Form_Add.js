import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
export default function VerticalLinearStepper() {
  const classes = useStyles();
  const cookies = new Cookies();
  const TypeDoc = JSON.parse(localStorage.getItem('typedoc'));
  const TypeMouv = JSON.parse(localStorage.getItem('typemouv'));
  const Service =JSON.parse(localStorage.getItem('service'));

  const [formData, setFormData] = React.useState({
    num_document: '',
    code_type_doc: '',
    code_type_mouv: '',
    code_service_dist: '',
    code_service_anc:'',
    code_service_dest: '',
    matricule_per_sign: "/",
    matricule_per_use: "/",
    observation:"/",
  });
  const {observation,matricule_per_use,matricule_per_sign,code_service_dest,code_service_anc,code_service_dist,code_type_mouv,code_type_doc,num_document} = formData;
  const onChange = e=> setFormData({
    ...formData,[e.target.name]:e.target.value
  });
  const send = async e => {
    e.preventDefault();
    const element={
      num_document,
      code_type_doc,
      code_type_mouv,
      code_service_dist,
      code_service_anc,
      code_service_dest,
      matricule_per_sign,
      matricule_per_use,
      observation
    };

    try{
      const body = JSON.stringify(element);
      const res = await axios.post('/api/document',body,{headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "x-auth-token":cookies.get('token'),
      }});
      setAlert("Ajoute d'un nouveau element a ete effectue avec Success",'success');
    }catch(err){
      setAlert(err.response.data.errors[0].msg,'error');
    }
  }

  return (
    <div className={classes.root} lg={5}>
    <div className={classes.toolbar} />
      <Grid container justify="left" spacing={2}>
        <Grid item xs={12} sm={12} lg={6}>
          <TextField
                  label="Numero de document"
                  placeholder="Numero de document"
                  helperText=""
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name='num_document'
                  value={num_document}
                  onChange={e => onChange(e)}

              />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
             <InputLabel id="demo-simple-select-outlined-label">Type de document</InputLabel>
             <Select

               label="Type de document"
               name='code_type_doc'
               value={code_type_doc}
               onChange={e => onChange(e)}
             >
             {TypeDoc.map((option) => (<MenuItem key={option._id} value={option._id}>{option.description_Fr}</MenuItem>))}
             </Select>
           </FormControl>
       </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
             <InputLabel id="demo-simple-select-outlined-label">Type de mouvement</InputLabel>
             <Select

               label="Type de mouvement"
               name='code_type_mouv'
               value={code_type_mouv}
               onChange={e => onChange(e)}
             >
             {TypeMouv.map((option) => (<MenuItem key={option._id} value={option._id}>{option.description_Fr}</MenuItem>))}
             </Select>
           </FormControl>
         </Grid>
         <Grid item xs={12} sm={12} lg={7}>
           <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
              <InputLabel id="demo-simple-select-outlined-label">Service de distribution</InputLabel>
              <Select

                label="Service de distribution"
                name='code_service_dist'
                value={code_service_dist}
                onChange={e => onChange(e)}
              >
              {Service.map((option) => (<MenuItem key={option._id}  value={option._id}>{option.description_Fr}</MenuItem>))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} lg={7}>
            <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
               <InputLabel id="demo-simple-select-outlined-label">Service de destination</InputLabel>
               <Select

                 label="Service de destination"
                 name='code_service_dest'
                 value={code_service_dest}
                 onChange={e => onChange(e)}
               >
               {Service.map((option) => (<MenuItem key={option._id}  value={option._id}>{option.description_Fr}</MenuItem>))}
               </Select>
             </FormControl>
           </Grid>
           <Grid item xs={12} sm={12} lg={7}>
             <FormControl variant="outlined" className={classes.formControl} style={{minWidth:"100%"}}>
                <InputLabel id="demo-simple-select-outlined-label">Ancienne Service</InputLabel>
                <Select

                  label="Ancienne Service"
                  name='code_service_anc'
                  value={code_service_anc}
                  onChange={e => onChange(e)}
                >
                {Service.map((option) => (<MenuItem key={option._id}  value={option._id}>{option.description_Fr}</MenuItem>))}
                </Select>
              </FormControl>
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
                    Ajouter un document
                 </Button>
               </Grid>

     </Grid>
    </div>
  );
}
