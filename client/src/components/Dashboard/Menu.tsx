import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Title from '../shared/Title';
import OrderTypeDialog from '../shared/OrderTypeDialog';
import {
  useMenuState,
  useMenuDispatch,
  loadMenu,
  Category,
  CategoryItem
} from '../../contexts/menu';
import {
  useOrderState,
  useOrderDispatch,
  postOrder,
  Order,
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

export default function Menu() {
  const [openDialog, setOpenDialog] = useState(false);
  const { menu, isMenuLoading } = useMenuState();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const menuDispatch = useMenuDispatch();

  const { order } = useOrderState();
  const orderDispatch = useOrderDispatch();

  const handleDialogCancel = () => {
    setOpenDialog(false);
  };

  const addToOrder = (item: CategoryItem) => {
    if (order === null) {
      return setOpenDialog(true);
    }
    orderDispatch({
      type: OrderActionTypes.SET_ORDER,
      payload: { ...order, orderItems: [...order.orderItems, item] }
    });
  };

  useEffect(() => {
    loadMenu(menuDispatch);
  }, [menuDispatch]);
  // useEffect(()=>{
  //   if(selectedCategory!==null){
  //   loadItems(menuDispatch,selectedCategory);}
  // },[menuDispatch,selectedCategory])
  const classes = useStyles();
  return (
    <>
      <OrderTypeDialog onCancel={handleDialogCancel} isOpen={openDialog} />
      <Title>Menu</Title>
      {isMenuLoading && <CircularProgress />}
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={6}>
          {selectedCategory === null
            ? menu.map(category => (
                <GridListTile
                  key={category._id}
                  cols={1}
                  onClick={e => {
                    setSelectedCategory(category);
                  }}
                >
                  <img src={category.img} alt='' />
                  <GridListTileBar
                    title={`${category.name}`}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title
                    }}
                    actionIcon={
                      <IconButton aria-label={`star ${category.name}`}>
                        <StarBorderIcon className={classes.title} />
                      </IconButton>
                    }
                  />
                </GridListTile>
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
                  <img src={item.img} alt='' />
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
