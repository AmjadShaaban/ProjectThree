import React from 'react';
import Button from '@material-ui/core/Button';
import OrderTypeDialog from '../shared/OrderTypeDialog';
import { OrderActionTypes, useOrderDispatch } from '../../contexts/order';

export default function NewOrder() {
  const orderDispatch = useOrderDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Button
        variant='outlined'
        color='primary'
        /*disabled={user?.role==='UNKNOWN'}*/ onClick={handleClickOpen}
      >
        New Order
      </Button>
      <OrderTypeDialog
        onCancel={handleClose}
        onSubmit={order => {
          orderDispatch({ type: OrderActionTypes.SET_ORDER, payload: order });
          setOpenDialog(false);
        }}
        isOpen={openDialog}
      />
    </div>
  );
}
