import React, { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Title from '../shared/Title';
import {
  useMenuState,
  useMenuDispatch,
  addSpecialItem,
  loadItems
} from '../../contexts/menu';
import { CategoryItem } from '../../interfaces';

function not(a: CategoryItem[], b: CategoryItem[]) {
  return a.filter(aIng => b.findIndex(bIngr => bIngr._id === aIng._id) === -1);
}

function intersection(a: CategoryItem[], b: CategoryItem[]) {
  return a.filter(aIng => b.findIndex(bIngr => bIngr._id === aIng._id) !== -1);
}

const useStyles = makeStyles(theme => ({
  root1: {
    margin: 'auto'
  },
  paper1: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
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
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const ItemList: FC<{
  allItems: CategoryItem[];
  onListChange: (newList: CategoryItem[]) => void;
}> = ({ allItems: ingredients, onListChange }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState<CategoryItem[]>([]);
  const [left, setLeft] = React.useState<CategoryItem[]>(ingredients);
  const [right, setRight] = React.useState<CategoryItem[]>([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    setLeft(ingredients);
  }, [ingredients]);

  useEffect(() => {
    onListChange(right);
  }, [onListChange, right]);

  const handleToggle = (value: CategoryItem) => () => {
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
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items: CategoryItem[]) => {
    return (
      <Paper className={classes.paper1}>
        <List dense component='div' role='list'>
          {items.map((value: CategoryItem, index) => {
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
      spacing={3}
      justify='center'
      alignItems='flex-start'
      className={classes.root1}
    >
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction='column' alignItems='center'>
          <Button
            color='primary'
            variant='contained'
            size='small'
            className={classes.button1}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label='move all right'
          >
            ≫
          </Button>
          <Button
            color='primary'
            variant='contained'
            size='small'
            className={classes.button1}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label='move selected right'
          >
            &gt;
          </Button>
          <Button
            color='primary'
            variant='contained'
            size='small'
            className={classes.button1}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label='move selected left'
          >
            &lt;
          </Button>
          <Button
            color='primary'
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

export default function AddSpecial() {
  const { items } = useMenuState();
  const menuDispatch = useMenuDispatch();
  const [itemIngredients, setItemIngredients] = useState<CategoryItem[]>([]);
  const [name, setName] = useState('');
  const [iconLine1, setIconLine1] = useState('');
  const [iconLine2, setIconLine2] = useState('');
  const [iconLine3, setIconLine3] = useState('');
  const [price, setPrice] = useState(0);
  const [disc, setDisc] = useState('');
  const classes = useStyles();

  useEffect(() => {
    loadItems(menuDispatch);
  }, [menuDispatch]);

  return (
    <>
      <Title>Add Special</Title>
      <form
        className={classes.form}
        noValidate
        onSubmit={e => {
          e.preventDefault();
          const specialItem = {
            name,
            disc,
            iconLine1,
            iconLine2,
            iconLine3,
            items: itemIngredients,
            price
          };
          addSpecialItem(menuDispatch, specialItem);
        }}
      >
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
        <ItemList
          allItems={items}
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
