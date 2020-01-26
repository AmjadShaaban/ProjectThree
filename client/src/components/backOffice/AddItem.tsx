import React, { FC, useState, MouseEvent, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Title from '../shared/Title';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import {
  useMenuState,
  useMenuDispatch,
  addCategoryItem,
  loadMenu,
  loadIngredients
} from '../../contexts/menu';
import { Ingredient, IngredientTypes } from '../../interfaces';

const ITEM_HEIGHT = 48;

function not(a: Ingredient[], b: Ingredient[]) {
  return a.filter(aIng => b.findIndex(bIngr => bIngr._id === aIng._id) === -1);
}

function intersection(a: Ingredient[], b: Ingredient[]) {
  return a.filter(aIng => b.findIndex(bIngr => bIngr._id === aIng._id) !== -1);
}

const useStyles = makeStyles(theme => ({
  root1: {
    margin: 'auto'
  },
  paper1: {
    width: 200,
    height: 230,
    overflow: 'auto'
  },
  button1: {
    margin: theme.spacing(0.5, 0)
  },

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

const IngredientList: FC<{
  ingredients: Ingredient[];
  onListChange: (newList: Ingredient[]) => void;
}> = ({ ingredients, onListChange }) => {
  console.log(ingredients);
  const classes = useStyles();
  const [checked, setChecked] = React.useState<Ingredient[]>([]);
  const [left, setLeft] = React.useState<Ingredient[]>(ingredients);
  const [right, setRight] = React.useState<Ingredient[]>([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    setLeft(ingredients);
  }, [ingredients]);

  useEffect(() => {
    onListChange(right);
  }, [right]);

  const handleToggle = (value: Ingredient) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
    console.log('handleAllRight');
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    console.log('handleCheckedRight');
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    console.log('handleCheckedLeft');
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    console.log('handleAllLeft');
  };

  const customList = (items: Ingredient[]) => {
    console.log(items);
    return (
      <Paper className={classes.paper1}>
        <List dense component='div' role='list'>
          {items.map((value: Ingredient, index) => {
            const labelId = `transfer-list-item-${index}-label`;

            return (
              <ListItem
                key={value._id}
                role='listitem'
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={
                      checked.findIndex(
                        checkedValue => checkedValue._id === value._id
                      ) !== -1
                    }
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Paper>
    );
  };

  return (
    <Grid
      container
      spacing={2}
      justify='center'
      alignItems='center'
      className={classes.root1}
    >
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction='column' alignItems='center'>
          <Button
            variant='outlined'
            size='small'
            className={classes.button1}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label='move all right'
          >
            ≫
          </Button>
          <Button
            variant='outlined'
            size='small'
            className={classes.button1}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label='move selected right'
          >
            &gt;
          </Button>
          <Button
            variant='outlined'
            size='small'
            className={classes.button1}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label='move selected left'
          >
            &lt;
          </Button>
          <Button
            variant='outlined'
            size='small'
            className={classes.button1}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label='move all left'
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
};

export default function AddItem() {
  const { menu, ingredients } = useMenuState();
  const menuDispatch = useMenuDispatch();
  const [itemIngredients, setItemIngredients] = useState<Ingredient[]>([]);
  const [catId, setCatId] = useState('');
  const [name, setName] = useState('');
  const [iconLine1, setIconLine1] = useState('');
  const [iconLine2, setIconLine2] = useState('');
  const [iconLine3, setIconLine3] = useState('');
  const [price, setPrice] = useState(0);
  const [disc, setDisc] = useState('');
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    loadMenu(menuDispatch);
    loadIngredients(menuDispatch);
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
            ingredients: itemIngredients,
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
          variant='outlined'
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
        />
        <IngredientList
          ingredients={ingredients}
          onListChange={pickedIngredients => {
            setItemIngredients(pickedIngredients);
          }}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          type='number'
          id='price'
          value={price}
          onChange={e => setPrice(parseFloat(e.target.value))}
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
