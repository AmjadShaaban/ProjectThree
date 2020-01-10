import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Title from './Title';
import { useAuthState } from '../../contexts/auth';

function preventDefault(event: Event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
    depositContext: {
      flex: 1
    },
    root: {
      height: '100vh'
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
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
}));

export default function Deposits() {
  const { user } = useAuthState();
  const [name, setName]=useState('');
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Welcome</Title>
      <Typography component='p' variant='h4'>
        {user && user.fName}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        {user.admin ? 'You are Admin' : 'You are NOT Admin'}
      </Typography>
      <form
            className={classes.form}
            noValidate
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='name'
              value={name}
              onChange={e => setName(e.target.value)}
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Submit
            </Button>
          </form>

      <div>
        <Link color='primary' href='#'>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
