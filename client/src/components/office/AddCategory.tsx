import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from '../shared/Title';
import { useMenuDispatch, addCategory } from '../../contexts/menu';

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

export default function AddCategory() {
  const menuDispatch = useMenuDispatch();
  const [name, setName] = useState('');
  const [disc, setDiscription] = useState('');
  const [iconLine1, setIconLine1] = useState('');
  const [iconLine2, setIconLine2] = useState('');
  const [iconLine3, setIconLine3] = useState('');
  const classes = useStyles();
  return (
    <>
      <Title>Add Category</Title>
      <form
        className={classes.form}
        noValidate
        onSubmit={e => {
          e.preventDefault();
          addCategory(menuDispatch, {
            name,
            disc,
            iconLine1,
            iconLine2,
            iconLine3
          });
        }}
      >
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='category-name'
          value={name}
          onChange={e => setName(e.target.value)}
          label='Category Name'
          name='name'
          autoFocus
        />
        <TextField
          id='category-disc'
          label='Category Discription'
          variant='outlined'
          fullWidth
          multiline
          rows='4'
          value={disc}
          onChange={e => setDiscription(e.target.value)}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='cat-icon-line-1'
          value={iconLine1}
          onChange={e => setIconLine1(e.target.value)}
          label='line 1'
          name='name'
          autoFocus
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='cat-icon-line-2'
          value={iconLine2}
          onChange={e => setIconLine2(e.target.value)}
          label='line 2:'
          name='line 2'
          autoFocus
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='cat-icon-line-3'
          value={iconLine3}
          onChange={e => setIconLine3(e.target.value)}
          label='line 3:'
          name='line 3'
          autoFocus
        />
        <Button
          color='primary'
          type='submit'
          fullWidth
          variant='contained'
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </>
  );
}
