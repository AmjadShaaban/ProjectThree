import React, { FC, useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import Title from '../shared/Title';
import OrderTypeDialog from '../shared/OrderTypeDialog';
import { Category, CategoryItem, Order } from '../../interfaces';
import {
  useMenuState,
  useMenuDispatch,
  loadMenu,
  setSelectedCategory
} from '../../contexts/menu';
import {
  useOrderState,
  useOrderDispatch,
  OrderActionTypes
} from '../../contexts/order';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    tile: {
      width: '100%',
      height: '100%'
    },
    gridList: {
      width: '100%',
      height: '100%'
    },
    title: {
      color: theme.palette.primary.dark
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    }
  })
);
const MenuItemTile: FC<{
  data: Category | CategoryItem;
  onSelect: () => void;
}> = ({ onSelect, data }) => {
  const classes = useStyles();
  return (
    <GridListTile cols={2} onClick={onSelect} className={classes.tile}>
      <svg viewBox='0 0 125 125'>
        <rect height='100%' width='100%' fill='yellow' />
        <rect height='117' width='117' x='3%' y='3%' fill='gray' />
        <text x='10%' y='25%' fill='white'>
          {data.iconData.line1}
        </text>
        <text x='15%' y='50%' fill='black'>
          {data.iconData.line2}
        </text>
        <text x='10%' y='75%' fill='white'>
          {data.iconData.line3}
        </text>
        inline SVG Not Supported.
      </svg>
    </GridListTile>
  );
};

export default function Menu() {
  const [openDialog, setOpenDialog] = useState(false);
  const [pendingItem, setPendingItem] = useState<CategoryItem | null>(null);
  const { menu, isMenuLoading, selectedCategory } = useMenuState();
  const menuDispatch = useMenuDispatch();
  const { order } = useOrderState();
  const orderDispatch = useOrderDispatch();

  const handleDialogCancel = () => {
    setOpenDialog(false);
  };

  const handleNewOrder = (order: Order) => {
    if (pendingItem) {
      order.orderItems = [pendingItem];
    }

    orderDispatch({
      type: OrderActionTypes.SET_ORDER,
      payload: order
    });

    setOpenDialog(false);
  };
  const addToOrder = (item: CategoryItem) => {
    if (order === null) {
      setPendingItem(item);
      setOpenDialog(true);
      return;
    }
    orderDispatch({
      type: OrderActionTypes.SET_ORDER,
      payload: {
        ...order,
        orderItems: [...order.orderItems, item]
      }
    });
  };

  useEffect(() => {
    loadMenu(menuDispatch);
  }, [menuDispatch]);
  const classes = useStyles();
  return (
    <>
      <OrderTypeDialog
        onCancel={handleDialogCancel}
        onSubmit={handleNewOrder}
        isOpen={openDialog}
        idPrefix='menu-'
      />
      <Title>Menu</Title>
      {selectedCategory !== null && (
        <Button
          color='primary'
          onClick={() => setSelectedCategory(menuDispatch, null)}
          size={'small'}
        >
          Back
        </Button>
      )}
      {isMenuLoading && <CircularProgress />}
      <div className={classes.root}>
        <GridList cellHeight={'auto'} className={classes.gridList} cols={4}>
          {selectedCategory === null
            ? menu.map(category => (
                <div key={category._id}>
                  <MenuItemTile
                    data={category}
                    onSelect={() => {
                      setSelectedCategory(menuDispatch, category);
                    }}
                  />
                </div>
              ))
            : selectedCategory.items &&
              selectedCategory.items.map(item => (
                <GridListTile
                  key={item._id}
                  cols={1}
                  onClick={e => {
                    addToOrder(item);
                  }}
                >
                  <svg viewBox='0 0 150 150'>
                    <rect height='100%' width='100%' fill='lightgray' />
                    <text x='10%' y='25%' fill='white'>
                      {item.iconData.line1}
                    </text>
                    <text x='15%' y='50%' fill='black'>
                      {item.iconData.line2}
                    </text>
                    <text x='10%' y='75%' fill='white'>
                      {item.iconData.line3}
                    </text>
                    inline SVG Not Supported.
                  </svg>
                </GridListTile>
              ))}
        </GridList>
      </div>
    </>
  );
}
