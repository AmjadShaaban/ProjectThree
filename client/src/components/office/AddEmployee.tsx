import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../shared/Title';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Roles } from '../../interfaces';
import { useAuthDispatch, registerUser } from '../../contexts/auth';

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState();
  const authDispatch = useAuthDispatch();
  const classes = useStyles();
  return (
    <>
      <Title>Add Employee</Title>
      <form
        className={classes.form}
        noValidate
        onSubmit={e => {
          e.preventDefault();
          registerUser(authDispatch, {
            firstName,
            lastName,
            email,
            password,
            role
          });
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
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              label='First Name'
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant='outlined'
              fullWidth
              id='lastName'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
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
          checked={role === Roles.EMPLOYEE}
          onChange={e => setRole(e.target.value)}
          value={Roles.EMPLOYEE}
          name='Employee'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />

        <FormLabel component='legend'>Driver?</FormLabel>
        <Checkbox
          checked={role === Roles.DRIVER}
          onChange={e => setRole(e.target.value)}
          value={Roles.DRIVER}
          name='Driver'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />

        <FormLabel component='legend'>Manager?</FormLabel>
        <Checkbox
          checked={role === Roles.MANAGER}
          onChange={e => setRole(e.target.value)}
          value={Roles.MANAGER}
          name='Manager'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <FormLabel component='legend'>Cook?</FormLabel>
        <Checkbox
          checked={role === Roles.COOK}
          onChange={e => setRole(e.target.value)}
          value={Roles.COOK}
          name='Cook'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />

        <FormLabel component='legend'>Admin?</FormLabel>
        <Checkbox
          checked={role === Roles.ADMIN}
          onChange={e => setRole(e.target.value)}
          value={Roles.ADMIN}
          name='Admin'
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />

        <Button
          color='primary'
          type='submit'
          fullWidth
          variant='contained'
          className={classes.submit}
        >
          Add Employee
        </Button>
      </form>
    </>
  );
}
