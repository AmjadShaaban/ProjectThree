import React, { useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Title from '../shared/Title';
import {
  useMenuState,
  useMenuDispatch,
  loadMenu} from '../../contexts/menu';


  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      height: '100%',
    },
  }),
);
export default function Menu() {
  console.log('rendering Menu');
  const { menu, isMenuLoading } = useMenuState();
  const dispatch = useMenuDispatch();
  useEffect(() => {
    loadMenu(dispatch);
  }, [dispatch]);
 const classes = useStyles();
  return (
    <>
      <Title>Menu</Title>
      {isMenuLoading && <CircularProgress />}
      <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={6}>
        {menu.map(category => (
          <GridListTile key={category._id} cols={1}>
            <img src={category.img} alt='' />
          </GridListTile>
        ))}
      </GridList>
    </div>
      {/* <div>
        {/* {selectedMenu ? (
        <pre>{JSON.stringify(menuItems, null, 4)}</pre>
      ) :  
        MENU_TEST.map(category => {
          return (
            <>
            
            <div key={category._id}>
        <img
          height='100%'
          width='100%'
          src={category.img}
          alt=''
        />{category.name}
      </div>
       <button
              key={category._id}
              onClick={async () => {
                let test = await loadItems(dispatch, category.name);
                console.log(test);
              }}
            >
              Load {category.name} Items
            </button> */}
            </>
          );}
