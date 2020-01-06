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
    categories,
    categoryItems,
    selectedCategory,
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
      {selectedCategory ? (
        <pre>{JSON.stringify(categoryItems, null, 4)}</pre>
      ) : (
        categories.map(category => {
          return (
            <button
              onClick={() => {
                loadMenuItems(dispatch, category);
              }}
            >
              Load {category.title} Items
            </button>
          );
        })
      )}
    </>
  );
}
