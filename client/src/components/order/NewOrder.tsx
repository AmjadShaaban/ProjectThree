import React from 'react';
import Button from '@material-ui/core/Button';
import OrderTypeDialog from '../shared/OrderTypeDialog';
import {
  useOrderDispatch,
  useOrderState,
  postOrder,
  setOrder
} from '../../contexts/order';
import { useMenuDispatch, setSelectedCategory } from '../../contexts/menu';

export default function NewOrder() {
  const menuDispatch = useMenuDispatch();
  const orderDispatch = useOrderDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);
  const { order } = useOrderState();
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      {order === null ? (
        <Button
          variant='outlined'
          color='primary'
          /*disabled={user?.role==='UNKNOWN'}*/ onClick={handleClickOpen}
        >
          New Order
        </Button>
      ) : (
        <>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => {
              console.log(order);
              if (order === null) {
                return;
              }
              postOrder(orderDispatch, { order }).then(() => {
                setSelectedCategory(menuDispatch, null);
              });
            }}
          >
            Submit Order
          </Button>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => setOrder(orderDispatch, null)}
          >
            Cancel Order
          </Button>
        </>
      )}{' '}
      <OrderTypeDialog
        onCancel={handleClose}
        onSubmit={newOrder => {
          setOrder(orderDispatch, newOrder);
          setOpenDialog(false);
        }}
        isOpen={openDialog}
      />
    </div>
  );
}
