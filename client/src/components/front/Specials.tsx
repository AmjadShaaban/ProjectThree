import React, { FC, useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {
  useMenuState,
  useMenuDispatch,
  loadSpecials
} from '../../contexts/menu';
import { Category, CategoryItem, Order } from '../../interfaces';
import Title from '../shared/Title';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)'
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

export default function SingleLineGridList() {
  const { specials, isMenuLoading } = useMenuState();
  const menuDispatch = useMenuDispatch();

  useEffect(() => {
    loadSpecials(menuDispatch);
  }, [menuDispatch]);

  const classes = useStyles();
  return (
    <>
      <Title>Specials</Title>
      <div className={classes.root}>
        <GridList cellHeight={'auto'} className={classes.gridList} cols={6}>
          {specials.map(category => (
            <div key={category._id}>
              <MenuItemTile
                data={category}
                onSelect={() => {
                  console.log('object');

                  // setSelectedCategory(menuDispatch, category);
                }}
              />
            </div>
          ))}
        </GridList>
      </div>
    </>
  );
}
