import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useAuthState } from '../../contexts/auth';
import { useMenuDispatch,addCategory } from '../../contexts/menu'

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

export default function AddCategory() {
  const { user } = useAuthState();
  const menuDispatch = useMenuDispatch();
  const [name, setName]=useState('');
  const classes = useStyles();
  return (
    <>
      <Typography color='textSecondary' className={classes.depositContext}>
        {user.admin ? 'You are Admin' : 'You are NOT Admin'}
      </Typography>
      <form
            className={classes.form}
            noValidate
            onSubmit={e => {
              e.preventDefault();
              addCategory(menuDispatch,{name:name})
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
              label='Category Name'
              name='name'
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
    </>
  );
}
