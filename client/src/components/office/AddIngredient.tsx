import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Title from '../shared/Title';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useMenuDispatch, addIngredient } from '../../contexts/menu';
import { IngredientTypes } from '../../interfaces';

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
  const menuDispatch = useMenuDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [isTopping, setIsTopping] = useState(false);
  const [type, setType] = useState(IngredientTypes.CHEESE);

  const classes = useStyles();
  return (
    <>
      <Title>Add Ingredient</Title>
      <FormControl component='fieldset'>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => {
            e.preventDefault();
            addIngredient(menuDispatch, {
              name,
              type,
              isTopping,
              price
            });
          }}
        >
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='ingredient-name'
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
            onChange={e => setType(e.target.value as IngredientTypes)}
            row
          >
            <FormControlLabel
              value={IngredientTypes.CHEESE}
              control={<Radio color='primary' />}
              label={IngredientTypes.CHEESE}
              labelPlacement='top'
            />
            <FormControlLabel
              value={IngredientTypes.MEAT}
              control={<Radio color='primary' />}
              label={IngredientTypes.MEAT}
              labelPlacement='top'
            />
            <FormControlLabel
              value={IngredientTypes.DRESSING}
              control={<Radio color='primary' />}
              label={IngredientTypes.DRESSING}
              labelPlacement='top'
            />
            <FormControlLabel
              value={IngredientTypes.SAUCE}
              control={<Radio color='primary' />}
              label={IngredientTypes.SAUCE}
              labelPlacement='top'
            />

            <FormControlLabel
              value={IngredientTypes.VEGETABLE}
              control={<Radio color='primary' />}
              label={IngredientTypes.VEGETABLE}
              labelPlacement='top'
            />
            <FormControlLabel
              value={IngredientTypes.OTHER}
              control={<Radio color='primary' />}
              label={IngredientTypes.OTHER}
              labelPlacement='top'
            />
          </RadioGroup>
          <FormLabel component='legend'>Topping?</FormLabel>
          <Checkbox
            checked={isTopping === true}
            onChange={e => setIsTopping(!isTopping)}
            value={isTopping}
            name='isTopping'
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            type='number'
            id='ingredient-price'
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
      </FormControl>
    </>
  );
}
