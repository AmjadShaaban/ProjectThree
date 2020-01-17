import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Title from './Title';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useAuthState } from '../../contexts/auth';
import {
  useMenuDispatch,
  addIngredient,
  IngredientTypes
} from '../../contexts/menu';

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

export default function AddIngredient() {
  const { user } = useAuthState();
  const menuDispatch = useMenuDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isTopping, setIsTopping] = useState();
  const [type, setType] = useState();

  const classes = useStyles();
  return (
    <>
      <FormControl component='fieldset'>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => {
            e.preventDefault();
            addIngredient(menuDispatch, {
              name: name,
              type: type,
              isTopping: isTopping
            });
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
            label='Ingreident Name'
            name='name'
            autoFocus
          />

          <FormLabel component='legend'>Type</FormLabel>
          <RadioGroup
            aria-label='type'
            name='type'
            value={type}
            onChange={e => setType(e.target.value)}
            row
          >
            <FormControlLabel
              value={IngredientTypes.CHEESE}
              control={<Radio color='primary' />}
              label='Cheeses'
              labelPlacement='top'
            />
            <FormControlLabel
              value={IngredientTypes.MEAT}
              control={<Radio color='primary' />}
              label='Meats'
              labelPlacement='top'
            />
                        <FormControlLabel
              value={IngredientTypes.DRESSING}
              control={<Radio color='primary' />}
              label='Salad Dressing'
              labelPlacement='top'
            />
            <FormControlLabel
              value={IngredientTypes.SAUCE}
              control={<Radio color='primary' />}
              label='Sauces'
              labelPlacement='top'
            />

            <FormControlLabel
              value={IngredientTypes.VEGETABLE}
              control={<Radio color='primary' />}
              label='Vegetables'
              labelPlacement='top'
            />
            <FormControlLabel
              value={IngredientTypes.OTHER}
              control={<Radio color='primary' />}
              label='Others'
              labelPlacement='top'
            />
          </RadioGroup>
          <FormLabel component='legend'>Topping?</FormLabel>
          <Checkbox
            checked={isTopping}
            onChange={e => setIsTopping(e.target.checked)}
            value={false}
            name='isTopping'
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='name'
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
      </FormControl>
    </>
  );
}
