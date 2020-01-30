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
        <Button color='primary' variant='contained' onClick={handleClickOpen}>
          New Order
        </Button>
      ) : (
        <>
          <Button
            color='primary'
            variant='contained'
            onClick={() => {
              if (order === null) {
                return;
              }
              postOrder(orderDispatch, { order }).then(() => {
                setSelectedCategory(menuDispatch, null);
                setOrder(orderDispatch, null);
              });
            }}
          >
            Submit Order
          </Button>
          <Button
            color='primary'
            variant='contained'
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
        idPrefix='status-'
      />
    </div>
  );
}
