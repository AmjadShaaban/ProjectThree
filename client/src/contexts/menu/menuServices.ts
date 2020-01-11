import { Dispatch } from 'react';
import {
  MenuActionTypes,
  MenuActions,
  CategoryItemResDTO,
  MenuCategoryResDTO,
  MenuItems,
  Menu
} from './menuState';
import { MenuItem } from '@material-ui/core';

export const loadMenu = async (dispatch: Dispatch<MenuActions>) => {
  dispatch({ type: MenuActionTypes.GET_CATEGORIES });
  try {
    const response: MenuCategoryResDTO = await fetch('/api/menu').then(r =>
      r.json()
    );

    if (!response || !response.menu) {
      dispatch({
        type: MenuActionTypes.GET_CATEGORIES_FAIL,
        payload: 'Unable to retrieve menu'
      });
      return;
    }

    dispatch({
      type: MenuActionTypes.GET_CATEGORIES_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: MenuActionTypes.GET_CATEGORIES_FAIL,
      payload: 'Unable to retrieve menu'
    });
  }
};

// export const loadMenuItems = async (
//   dispatch: Dispatch<MenuActions>,
//   selectedMenu: Menu
// ) => {
//   dispatch({ type: MenuActionTypes.GET_CATEGORY_ITEMS });
//   dispatch({ type: MenuActionTypes.SELECT_CATEGORY, payload: });

//   try {
//     const response: CategoryItemResDTO = await fetch(
//       `/api/menu/${category.id}`
//     ).then(r => r.json());

//     if (!response || !response.categoryItems) {
//       dispatch({
//         type: MenuActionTypes.GET_CATEGORY_ITEMS_FAIL,
//         payload: 'Unable to retrieve items'
//       });
//       return;
//     }

//     dispatch({
//       type: MenuActionTypes.GET_CATEGORY_ITEMS_SUCCESS,
//       payload: response
//     });
//   } catch (error) {
//     dispatch({
//       type: MenuActionTypes.GET_CATEGORY_ITEMS_FAIL,
//       payload: 'Unable to retrieve items'
//     });
//   }
// };
