import React, { useState,MouseEvent,useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Title from './Title';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { useAuthState } from '../../contexts/auth';
import { useMenuState,useMenuDispatch,addCategoryItem, loadMenu } from '../../contexts/menu'

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
  const { user } = useAuthState();
  const {menu,isMenuLoading} = useMenuState();
  const menuDispatch = useMenuDispatch();
  const [catId,setCatId]=useState('')
  const [name, setName]=useState('');
  const [price, setPrice]=useState('');
  const [discription, setDiscription]=useState('');
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  useEffect(()=>{
    loadMenu(menuDispatch);
},[menuDispatch])
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: MouseEvent<HTMLElement>) => {
    setCatId(event.currentTarget.id)
    console.log(catId);
    setAnchorEl(null);
  };
  return (
    <>
      <form
            className={classes.form}
            noValidate
            onSubmit={e => {
              e.preventDefault();
              const categoryItem = {
                catId:catId,
                name:name,
                discription: discription,
                price:price
              }
              addCategoryItem(menuDispatch,categoryItem)
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
          <MenuItem
            key={option._id}
            id={option._id}
            onClick={handleClose}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
      <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='name'
              value={name}
              onChange={e => setName(e.target.value)}
              label='Item Name'
              name='name'
              autoFocus
            />
            <TextField
          id="standard-multiline-static"
          label="Item Discription"
          multiline
          rows="4"
          value={discription}
          onChange={e=>setDiscription(e.target.value)}
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
