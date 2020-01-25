import React, { useState, MouseEvent, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Title from '../shared/Title';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import {
  useMenuState,
  useMenuDispatch,
  addCategoryItem,
  loadMenu
} from '../../contexts/menu';

const ITEM_HEIGHT = 48;
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

export default function AddItem() {
  const { menu } = useMenuState();
  const menuDispatch = useMenuDispatch();
  const [catId, setCatId] = useState('');
  const [name, setName] = useState('');
  const [iconLine1, setIconLine1] = useState('');
  const [iconLine2, setIconLine2] = useState('');
  const [iconLine3, setIconLine3] = useState('');
  const [price, setPrice] = useState('');
  const [disc, setDisc] = useState('');
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    loadMenu(menuDispatch);
  }, [menuDispatch]);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: MouseEvent<HTMLElement>) => {
    setCatId(event.currentTarget.id);
    setAnchorEl(null);
  };
  return (
    <>
      <Title>Add Item</Title>
      <form
        className={classes.form}
        noValidate
        onSubmit={e => {
          e.preventDefault();
          const categoryItem = {
            catId,
            name,
            disc,
            iconLine1,
            iconLine2,
            iconLine3,
            price
          };
          addCategoryItem(menuDispatch, categoryItem);
        }}
      >
        <IconButton
          aria-label='more'
          aria-controls='menu-categories'
          aria-haspopup='true'
          onClick={handleClick}
        >
          Select Category
          <MoreVertIcon />
        </IconButton>
        <Menu
          id='menu-categories'
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          {menu.map(option => (
            <MenuItem key={option._id} id={option._id} onClick={handleClose}>
              {option.name}
            </MenuItem>
          ))}
        </Menu>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='item-name'
          value={name}
          onChange={e => setName(e.target.value)}
          label='Item Name'
          name='name'
          autoFocus
        />
        <TextField
          id='standard-multiline-static'
          label='Item Discription'
          multiline
          rows='4'
          value={disc}
          onChange={e => setDisc(e.target.value)}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='icon-line-1'
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
          id='Icon-line-2'
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
          id='icon-line-3'
          value={iconLine3}
          onChange={e => setIconLine3(e.target.value)}
          label='line 3:'
          name='line 3'
          autoFocus
        />

        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='price'
          value={price}
          onChange={e => setPrice(e.target.value)}
          label='Price'
          name='price'
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
