import React, { FC, useState, ComponentType } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Title from '../shared/Title';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
  useOrderState,
  useOrderDispatch,
  OrderActionTypes
} from '../../contexts/order';
import { CategoryItem, Ingredient } from '../../interfaces';

const useRootStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      fontFamily: 'Mini-System'
    }
  })
);

const useNestedStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

const OrderInvoiceItemIngredient: ComponentType<{ ingredient: Ingredient }> = ({
  ingredient
}) => {
  const classes = useNestedStyles();

  return (
    <ListItem button className={classes.nested}>
      <ListItemIcon>
        <StarBorder />
      </ListItemIcon>
      <ListItemText primary={ingredient.name} />
    </ListItem>
  );
};

const OrderInvoiceItem: FC<{
  item: CategoryItem;
  isOpen: boolean;
  onToggle: () => void;
  onRemove: () => void;
}> = ({ item, isOpen, onToggle, onRemove }) => {
  console.log(item);
  return (
    <>
      <ListItem button onClick={onToggle}>
        <ListItemIcon onClick={onRemove}>
          <DeleteForeverIcon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={isOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {item.ingredients?.map(ingredient => (
            <OrderInvoiceItemIngredient
              key={ingredient.name}
              ingredient={ingredient}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default function OrderInvoice() {
  const classes = useRootStyles();
  const [openTab, setOpenTab] = useState<{ [id: number]: boolean }>({});
  const { order } = useOrderState();
  const orderDispatch = useOrderDispatch();
  const orderTotal = order?.orderItems.reduce((acc, orderItem) => {
    return acc + orderItem.price;
  }, 0);
  const handleClick = (id: number) => {
    setOpenTab({ ...openTab, [id]: !openTab[id] });
  };

  const removeFromOrder = (item: CategoryItem, index: number) => {
    const orderItems = [...order!.orderItems];
    orderItems.splice(index, 1);
    order &&
      orderDispatch({
        type: OrderActionTypes.SET_ORDER,
        payload: { ...order!, orderItems }
      });
  };

  return (
    <List
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          <Title>Order Invoice</Title>
          <div>Total: {orderTotal} </div>
        </ListSubheader>
      }
      className={classes.root}
    >
      {order?.orderItems.map((item, index) => (
        <OrderInvoiceItem
          key={index}
          item={item}
          onRemove={() => {
            removeFromOrder(item, index);
          }}
          onToggle={() => {
            handleClick(index);
          }}
          isOpen={openTab[index]}
        />
      ))}
    </List>
  );
}
