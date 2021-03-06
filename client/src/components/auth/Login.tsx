import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthDispatch, loginUser } from '../../contexts/auth';
import { useHistory, useLocation } from 'react-router-dom';
import Copyright from '../shared/Copyright';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  input: {
    backgroundColor: theme.palette.common.white
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
export default function SignInSide() {
  const history = useHistory();
  const location = useLocation<{ from: Location }>();
  const classes = useStyles();
  const [email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const authDispatch = useAuthDispatch();
  const { from } = location.state;

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={e => {
              e.preventDefault();
              loginUser(authDispatch, { email, password }).then(
                success => success && history.push(from.pathname)
              );
            }}
          >
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              autoFocus={true}
              id='email'
              type='email'
              value={email}
              onChange={e => setUserEmail(e.target.value)}
              label='Email Address'
              name='email'
              autoComplete='off'
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              autoFocus={true}
              name='password'
              label='Password'
              type='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete='off'
            />
            <Button
              color='primary'
              type='submit'
              fullWidth
              variant='contained'
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
