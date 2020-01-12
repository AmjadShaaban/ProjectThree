import React, { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Title from './Title';
import {
  useMenuState,
  useMenuDispatch,
  loadMenu,
  loadMenuItems,
  MenuActionTypes
} from '../../contexts/menu';

export default function Menu() {
  console.log('rendering Menu');
  const {
    menu,
    menuItems,
    selectedMenu,
    isMenuLoading
  } = useMenuState();
  const dispatch = useMenuDispatch();

  const theme = useTheme();
  useEffect(() => {
    loadMenu(dispatch);
  }, [dispatch]);

  return (
    <>
      <Title>Menu</Title>

      {isMenuLoading && <CircularProgress />}

      <button
        onClick={() => loadMenu(dispatch)
        }
      >
        Refresh
      </button>
      <div>
      {/* {selectedMenu ? (
        <pre>{JSON.stringify(menuItems, null, 4)}</pre>
      ) :  */
      (
        menu.map(category => {
          return (
            <button
            key={category._id}
              onClick={async() => {
                let test = await loadMenuItems(dispatch,category)
                console.log(test)
              }}
            >
              Load {category.name} Items
            </button>
          );
        })
      )}
      </div>
    </>
  );
}
