import React from 'react';
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

axios.defaults.baseURL = url;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
    toolbar: theme.mixins.toolbar,
  button:{
    textTransform: "none",
  }
}));


const Add_New = ({setAlert}) => {
  const classes = useStyles();
  const [formData, setFormData] = React.useState({
    name:'',
    email:'',
    ville:'',
    address:'',
    bank_account:'',
    telephone:'',
    telephone2:'',
    fax:'',
    fax2:'',
    description:''
  });
  const cookie = new Cookies();
  const {name,
          email,
          ville,
          address,
          bank_account,
          telephone,
          telephone2,
          fax,
          fax2,
          description} = formData;
  const onChange = e=> setFormData({
    ...formData,[e.target.name]:e.target.value
  });
  const send = async e => {
    e.preventDefault();

    const element={
      name,
      email,
      ville,
      address,
      bank_account,
      telephone,
      telephone2,
      fax,
      fax2,
      description
    };
    try{
      const body = JSON.stringify(element);
      const res = await axios.post('/api/fournisseur',body,{headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "x-auth-token":cookie.get('token'),
      }});
      setAlert("Ajoute d'un nouveau fournisseur a ete effectue avec Success",'success');
      setFormData({
        name:'',
        email:'',
        ville:'',
        address:'',
        bank_account:'',
        telephone:'',
        telephone2:'',
        fax:'',
        fax2:'',
        description:''
      });

    }catch(err){
      setAlert(err.response.data.errors[0].msg,'error');
    }
  }
  return (
    <div className={classes.root}>
    <div className={classes.toolbar} />
    <Grid container spacing={1} justify='center'>
      <Grid item md={6} xs={12} sm={8} lg={4}>
        <Grid container spacing={1} justify='center'>
          <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
               label="Nom du Fournisseur"
               placeholder="Nom du Fournisseur"
               helperText=""
               fullWidth
               type="search"
               style={{ margin: 8 }}
               margin="normal"
               variant="outlined"
               name='name'
               value={name}
               onChange={e => onChange(e)}
             />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
               label="email"
               placeholder="email"
               helperText=""
               type="search"
               style={{ margin: 8 }}
               fullWidth
               margin="normal"
               variant="outlined"
               name='email'
               value={email}
               onChange={e => onChange(e)}
             />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                style={{ margin: 8 }}
               label="ville"
               type="search"
               placeholder="ville"
               helperText=""
               fullWidth
               name='ville'
               value={ville}
               onChange={e => onChange(e)}
               margin="normal"
               variant="outlined"
             />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
               label="Address"
               type="search"
               style={{ margin: 8 }}
               placeholder="Address"
               helperText=""
               fullWidth
               name='address'
               value={address}
               onChange={e => onChange(e)}
               margin="normal"
               variant="outlined"
             />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                label="Numero du telephone"
                style={{ margin: 8 }}
                placeholder="XXXX XX XX XX"
               helperText=""
               fullWidth
               type="search"
               name='telephone'
               value={telephone}
               onChange={e => onChange(e)}
               margin="normal"
               variant="outlined"
             />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                label="Numero du telephone #2"
               style={{ margin: 8 }}
               placeholder="XXXX XX XX XX"
               helperText=""
               fullWidth
               type="search"
               name='telephone2'
               value={telephone2}
               onChange={e => onChange(e)}
               margin="normal"
               variant="outlined"
             />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
               label="Numero du fax "
               style={{ margin: 8 }}
               placeholder="XXX XX XX XX"
               helperText=""
               fullWidth
               type="search"
               name='fax'
               value={fax}
               onChange={e => onChange(e)}
               margin="normal"
               variant="outlined"
             />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                label="Numero du fax #2"
               style={{ margin: 8 }}
               placeholder="XXX XX XX XX"
               helperText=""
               fullWidth
               type="search"
               name='fax2'
               value={fax2}
               onChange={e => onChange(e)}
               margin="normal"
               variant="outlined"
             />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Numero du compte Bancaire "
               style={{ margin: 8 }}
               placeholder="XXXXXXXXXXXXXXX"
               helperText=""
               fullWidth
               type="search"
               name='bank_account'
               value={bank_account}
               onChange={e => onChange(e)}
               margin="normal"
               variant="outlined"
             />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Description "
               style={{ margin: 8 }}
               placeholder="Description"
               helperText=""
               fullWidth
               type="search"
               name='description'
               value={description}
               onChange={e => onChange(e)}
               margin="normal"
               variant="outlined"
             />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} >
              <Button
                style={{ margin: 8 }}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SaveIcon/>}
                fullWidth
                onClick={send}
                size="large"
              >
                Ajouter un Fournisseur
              </Button>
          </Grid>
        </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
Add_New.propTypes = {
  setAlert: PropTypes.func.isRequired
}
export default connect(null, {setAlert})(Add_New);
