import React, { Fragment, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import App from './App';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Cookies from 'universal-cookie';
import { url } from './defaults/default';
import { connect } from 'react-redux';
import { setAlert } from './actions/alert';
import PropTypes from 'prop-types';
axios.defaults.baseURL = url;

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href=''>
        Fateh Djehinet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({ setAlert }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const login = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    try {
      const body = JSON.stringify(user);
      const res = await axios.post('/api/auth', body, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const token = res.data.token;
      let d = new Date();
      d.setTime(d.getTime() + 2 * 60 * 1000);
      const cookies = new Cookies();
      cookies.set('token', token, { path: '/' /*, expires: d*/ });
      ReactDOM.render(<App />, document.getElementById('root'));
      //alert('LoggedIn');
      cookies.set('password', password, { path: '/' });
      cookies.set('email', email, { path: '/' });
      setAlert('connexion avec Success', 'success');
    } catch (err) {
      setAlert('connexion a echoue', 'error');
    }
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Connexion
        </Typography>
        <div>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            autoComplete='email'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            onClick={login}
          >
            Se Connecter
          </Button>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
SignIn.propTypes = {
  setAlert: PropTypes.func.isRequired,
};
export default connect(null, { setAlert })(SignIn);
