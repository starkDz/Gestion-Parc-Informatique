import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';

import Cookies from 'universal-cookie';
axios.defaults.baseURL = 'http://192.168.1.35:5000';
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
}));


export default function InteractiveList() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
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
      alert(body);
      const res = await axios.post('/api/type',body,{headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "x-auth-token":cookie.get('token'),
      }});

    }catch(err){
      console.error(err.response.data);
    }
  }
  return (
    <div className={classes.root}>
    <Grid container spacing={0}>
        <Grid item xs={12} md={12}>
        <Typography gutterBottom variant="h5" component="h2" align='center'>
          Nouveau
        </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
            <TextField
             
             label="Designation en Francais"
             style={{ margin: 8 }}
             placeholder="Designation en Francais"
             helperText=""
             fullWidth
             name='description_Fr'
            value={description_Fr}
            onChange={e => onChange(e)}
             size="small"
             margin="normal"
             variant="outlined"
             InputLabelProps={{
               shrink: true,
             }}
           />
        </Grid>
        <Grid item xs={12} md={12}>
            <TextField
            
             style={{ margin: 8 }}
             placeholder="التعيين باللغة العربية"
             helperText=""
             fullWidth
             name='description_Ar'
            value={description_Ar}
            onChange={e => onChange(e)}
             size="small"
             dir= 'rtl'
             margin="normal"
             variant="outlined"
             InputLabelProps={{
               shrink: true,
             }}
           />
        </Grid>
        <Grid item xs={12} md={12} >
            <Button
              style={{ margin: 8 }}
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SaveIcon/>}
              fullWidth
              onClick={send}
            >
              Ajouter
            </Button>
        </Grid>

      </Grid>
    </div>
  );
}
