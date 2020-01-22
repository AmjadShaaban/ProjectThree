import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Title from '../shared/Title';
import {
  useMenuState,
  useMenuDispatch,
  loadMenu,
  Category} from '../../contexts/menu';

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
    }
  })
);
export default function Menu() {
  const { menu, isMenuLoading } = useMenuState();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const menuDispatch = useMenuDispatch();
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
                </GridListTile>
              ))
            : selectedCategory.items&&selectedCategory.items.map(item => (
                <GridListTile key={item._id} cols={1}>
                  <img src={item.img} alt='' />
                </GridListTile>
              ))}
        </GridList>
      </div>
    </>
  );
}
