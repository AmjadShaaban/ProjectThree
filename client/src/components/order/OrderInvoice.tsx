import React, { FC, useState } from 'react';
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
import { CategoryItem } from '../../interfaces';

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

const OrderInvoiceItemIngredient: FC<{ name: string }> = ({ name }) => {
  const classes = useNestedStyles();

  return (
    <ListItem button className={classes.nested}>
      <ListItemIcon>
        <StarBorder />
      </ListItemIcon>

      <ListItemText primary={name} />
    </ListItem>
  );
};

const OrderInvoiceItem: FC<{
  item: CategoryItem;
  isOpen: boolean;
  onToggle: () => void;
  onRemove: () => void;
}> = ({ item, isOpen, onToggle, onRemove }) => (
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
        {item.ingredients?.map((ingredient, index) => (
          <OrderInvoiceItemIngredient key={index} name={ingredient.name} />
        ))}
      </List>
    </Collapse>
  </>
);

export default function OrderInvoice() {
  const classes = useRootStyles();
  const [openTab, setOpenTab] = useState<{ [id: number]: boolean }>({});
  const { order } = useOrderState();
  const orderDispatch = useOrderDispatch();
  const handleClick = (id: number) => {
    setOpenTab({ ...openTab, [id]: !openTab[id] });
  };

  const removeFromOrder = (index: number) => {
    const orderItems = [...order!.orderItems];
    orderItems.splice(index, 1);

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
        </ListSubheader>
      }
      className={classes.root}
    >
      {order?.orderItems.map((item, index) => (
        <OrderInvoiceItem
          key={index}
          item={item}
          onRemove={() => {
            removeFromOrder(index);
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
