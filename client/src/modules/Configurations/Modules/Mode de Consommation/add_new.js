import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Provider, connect } from 'react-redux';
import store from '../../../../store';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { url } from '../../../../defaults/default';
import { setAlert } from '../../../../actions/alert';
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
    description_Fr:'',
    description_Ar:''
  });
  const cookie = new Cookies();
  const {description_Fr,description_Ar} = formData;
  const onChange = e=> setFormData({
    ...formData,[e.target.name]:e.target.value
  });
  const send = async e => {
    e.preventDefault();

    const element={
      description_Fr,
      description_Ar
    };
    try{
      const body = JSON.stringify(element);
      const res = await axios.post('/api/mode_consommation',body,{headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "x-auth-token":cookie.get('token'),
      }});
      setAlert("Ajoute d'un nouveau element a ete effectue avec Success",'success');
      setFormData({
        description_Fr:'',
        description_Ar:''
      });
    }catch(err){
      setAlert(err.response.data.errors[0].msg,'error');
    }
  }
  return (
    <div className={classes.root}>
    <div className={classes.toolbar} />
    <div className={classes.toolbar} />
    <Grid container spacing={6} justify='center'>
      <Grid item md={6} xs={12} sm={8} lg={4}>
        <Grid container spacing={3} justify='center'>
          <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
               label="Designation en Francais"
               style={{ margin: 8 }}
               placeholder="Designation en Francais"
               helperText=""
               fullWidth
               type="search"
               name='description_Fr'
               value={description_Fr}
               onChange={e => onChange(e)}
               margin="normal"
               variant="outlined"
               InputLabelProps={{
                 shrink: true,
               }}
             />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
               style={{ margin: 8 }}
               placeholder="التعيين باللغة العربية"
               helperText=""
               fullWidth
               type="search"
               name='description_Ar'
               value={description_Ar}
               onChange={e => onChange(e)}
               dir= 'rtl'
               margin="normal"
               variant="outlined"
               InputLabelProps={{
                 shrink: true,
               }}
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
                Ajouter un mode de consommation
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
