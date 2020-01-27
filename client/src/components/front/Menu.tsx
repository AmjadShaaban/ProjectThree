import React, { FC, useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
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
  // postOrder,
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
      color: theme.palette.primary.light
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
  console.log('I ran');
  return (
    <GridListTile cols={1} onClick={onSelect} className={classes.tile}>
      <svg viewBox='0 0 150 150'>
        <rect height='100%' width='100%' fill='lightgray' />
        <text x='25%' y='25%' fill='red'>
          {data.iconData.line1}
        </text>
        <text x='35%' y='50%' fill='red'>
          {data.iconData.line2}
        </text>
        <text x='25%' y='75%' fill='red'>
          {data.iconData.line3}
        </text>
        inline SVG Not Supported.
      </svg>
      {/* <img src={data.img} alt='' /> */}
      <GridListTileBar
        title={`${data.name}`}
        classes={{
          root: classes.titleBar,
          title: classes.title
        }}
        actionIcon={
          <IconButton aria-label={`star ${data.name}`}>
            <StarBorderIcon className={classes.title} />
          </IconButton>
        }
      />
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
      />
      <Title>Menu</Title>
      {selectedCategory !== null && (
        <Button
          onClick={() => setSelectedCategory(menuDispatch, null)}
          size={'small'}
        >
          Back
        </Button>
      )}
      {isMenuLoading && <CircularProgress />}
      <div className={classes.root}>
        <GridList cellHeight={'auto'} className={classes.gridList} cols={6}>
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
                    <text x='25%' y='25%' fill='red'>
                      {item.iconData.line1}
                    </text>
                    <text x='35%' y='50%' fill='red'>
                      {item.iconData.line2}
                    </text>
                    <text x='25%' y='75%' fill='red'>
                      {item.iconData.line3}
                    </text>
                    inline SVG Not Supported.
                  </svg>

                  {/* <img src={item.img} alt='' /> */}
                  <GridListTileBar
                    title={`${item.name}`}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title
                    }}
                    actionIcon={
                      <IconButton aria-label={`star ${item.price}`}>
                        <StarBorderIcon className={classes.title} />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
        </GridList>
      </div>
    </>
  );
}