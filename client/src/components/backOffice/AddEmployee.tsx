import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../shared/Title';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';


import {
  useAuthState,
  useAuthDispatch,
  registerUser
} from '../../contexts/auth';

const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function ADDEmployee() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [employee, setEmployee] = useState();
  const [driver, setDriver] = useState();
  const [manager, setManager] = useState();
  const [admin, setAdmin] = useState();
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();
  const classes = useStyles();
  return (
    <>
      <Title>Welcome</Title>
      <form
        className={classes.form}
        noValidate
        onSubmit={e => {
          e.preventDefault();
          // registerUser(authDispatch, { fName, lName, email, password,employee, driver, manager, admin });
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete='fname'
              name='firstName'
              variant='outlined'
              fullWidth
              id='firstName'
              value={fName}
              onChange={e => setFName(e.target.value)}
              label='First Name'
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant='outlined'
              fullWidth
              id='lastName'
              value={lName}
              onChange={e => setLName(e.target.value)}
              label='Last Name'
              name='lastName'
              autoComplete='lname'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              label='Email Address'
              name='email'
              autoComplete='email'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              required
              fullWidth
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
          </Grid>
        </Grid>
        <FormLabel component='legend'>Employee?</FormLabel>
        <Checkbox
          checked={employee}
          onChange={e => setEmployee(e.target.checked)}
          value={false}
          name='isTopping'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />

        <FormLabel component='legend'>Driver?</FormLabel>
        <Checkbox
          checked={driver}
          onChange={e => setDriver(e.target.checked)}
          value={false}
          name='isTopping'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />

        <FormLabel component='legend'>Manager?</FormLabel>
        <Checkbox
          checked={manager}
          onChange={e => setManager(e.target.checked)}
          value={false}
          name='isTopping'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <FormLabel component='legend'>Admin?</FormLabel>
        <Checkbox
          checked={admin}
          onChange={e => setAdmin(e.target.checked)}
          value={false}
          name='isTopping'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />

        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Sign Up
        </Button>
      </form>
    </>
  );
}
