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
    isLoading
  } = useMenuState();
  const dispatch = useMenuDispatch();

  const theme = useTheme();
  useEffect(() => {
    loadMenu(dispatch);
  }, [dispatch]);

  return (
    <>
      <Title>Menu</Title>

      {isLoading && <CircularProgress />}

      <button
        onClick={() =>
          dispatch({ type: MenuActionTypes.SELECT_CATEGORY, payload: null })
        }
      >
        Clear
      </button>
      {selectedMenu ? (
        <pre>{JSON.stringify(menuItems, null, 4)}</pre>
      ) : (
        menu.map(category => {
          return (
            <button
              onClick={() => {
                loadMenuItems(dispatch, category);
              }}
            >
              Load {category.name} Items
            </button>
          );
        })
      )}
    </>
  );
}
