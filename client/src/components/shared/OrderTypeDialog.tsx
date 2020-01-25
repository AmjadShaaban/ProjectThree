import React, { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
// import OrderTypeDialogTabs from './OrderTypeDialogTabs';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { OrderTypes, CategoryItem, Order } from '../../interfaces';
// import { useOrderDispatch } from '../../contexts/order';

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

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction='left' ref={ref} {...props} />;
  }
);
const OrderTypeDialog: FC<{
  item?: CategoryItem;
  onCancel: () => void;
  onSubmit: (order: Order) => void;
  isOpen: boolean;
}> = ({ onCancel, onSubmit, isOpen, item }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [type, setType] = useState(OrderTypes.DELIVERY);
  const classes = useStyles();
  // const orderDispatch = useOrderDispatch();

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle id='alert-dialog-slide-title'>{`New Order`}</DialogTitle>
      <form
        className={classes.form}
        noValidate
        onSubmit={e => {
          e.preventDefault();
          onSubmit({
            customerName,
            customerPhone,
            customerAddress,
            type,
            orderItems: [],
            total: '0'
          });
        }}
      >
        <DialogContent>
          <FormLabel component='legend'>Type</FormLabel>
          <RadioGroup
            aria-label='type'
            name='type'
            value={type}
            onChange={e => setType(e.target.value as OrderTypes)}
            row
          >
            <FormControlLabel
              value={OrderTypes.DELIVERY}
              control={<Radio color='primary' />}
              label={OrderTypes.DELIVERY}
              labelPlacement='top'
            />
            <FormControlLabel
              value={OrderTypes.PICKUP}
              control={<Radio color='primary' />}
              label={OrderTypes.PICKUP}
              labelPlacement='top'
            />
            <FormControlLabel
              value={OrderTypes.ORDER_IN}
              control={<Radio color='primary' />}
              label={OrderTypes.ORDER_IN}
              labelPlacement='top'
            />
          </RadioGroup>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='name'
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            label='Customer Name'
            name='name'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='dense'
            required
            fullWidth
            disabled={type === OrderTypes.ORDER_IN}
            id='phone'
            value={customerPhone}
            onChange={e => setCustomerPhone(e.target.value)}
            label='Phone'
            name='phone'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            disabled={
              type === OrderTypes.PICKUP || type === OrderTypes.ORDER_IN
            }
            id='address'
            value={customerAddress}
            onChange={e => setCustomerAddress(e.target.value)}
            label='Delivery Address'
            name='address'
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button
            type='reset'
            fullWidth
            variant='contained'
            color='secondary'
            onClick={onCancel}
            className={classes.submit}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default OrderTypeDialog;
