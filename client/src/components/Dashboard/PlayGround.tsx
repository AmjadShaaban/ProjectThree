import React,{ useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useMenuDispatch, useMenuState, loadMenu } from '../../contexts/menu';
import Dialog from '../order/NewOrder'

const ITEM_HEIGHT = 48;

export default function PlayGround() {

  return (
    <>
      <Dialog/>
    </>
  );
}