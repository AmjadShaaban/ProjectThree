import { Dispatch } from 'react';
import {
  MenuActionTypes,
  MenuActions,
  CategoryItemResDTO,
  CategoryResDTO,
  Category
} from './menuState';

export const loadMenu = async (dispatch: Dispatch<MenuActions>) => {
  dispatch({ type: MenuActionTypes.GET_CATEGORIES });
  try {
    const response: CategoryResDTO = await fetch('/api/menu').then(r =>
      r.json()
    );

    if (!response || !response.categories) {
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

export const loadMenuItems = async (
  dispatch: Dispatch<MenuActions>,
  category: Category
) => {
  dispatch({ type: MenuActionTypes.GET_CATEGORY_ITEMS });
  dispatch({ type: MenuActionTypes.SELECT_CATEGORY, payload: category });

  try {
    const response: CategoryItemResDTO = await fetch(
      `/api/menu/${category.id}`
    ).then(r => r.json());

    if (!response || !response.categoryItems) {
      dispatch({
        type: MenuActionTypes.GET_CATEGORY_ITEMS_FAIL,
        payload: 'Unable to retrieve items'
      });
      return;
    }

    dispatch({
      type: MenuActionTypes.GET_CATEGORY_ITEMS_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: MenuActionTypes.GET_CATEGORY_ITEMS_FAIL,
      payload: 'Unable to retrieve items'
    });
  }
};
