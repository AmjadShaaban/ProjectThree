import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useAuthState } from '../../contexts/auth';
import { Roles } from '../../interfaces';
export const mainListItems: FC<{
  role: Roles;
  handleClick: () => void;
}> = ({ role, handleClick }) => {
  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Food Menu' />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary='Orders' />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary='Customers' />
      </ListItem>
      {role === Roles.MANAGER ||
        (role === Roles.ADMIN && (
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary='Reports' />
          </ListItem>
        ))}
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary='Back Office' />
      </ListItem>
    </div>
  );
};

export const secondaryListItems: FC<{
  role: Roles;
  handleClick: () => void;
}> = ({ role, handleClick }) => {
  return (
    <div>
      {role !== Roles.COOK && (
        <>
          <ListSubheader inset>New Order</ListSubheader>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Delivery' />
          </ListItem>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Pick-up' />
          </ListItem>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Order-In' />
          </ListItem>
        </>
      )}
    </div>
  );
};
