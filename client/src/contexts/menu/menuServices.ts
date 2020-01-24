import { Dispatch } from 'react';
import {
  MenuActionTypes,
  MenuActions,
  CategoryItemResDTO,
  IngredientResDTO,
  AddIngredientReqDTO,
  AddCategoryReqDTO,
  MenuResDTO,
  CategoryItemReqDTO,
  Category
} from './menuState';
export const loadMenu = async (dispatch: Dispatch<MenuActions>) => {
  dispatch({ type: MenuActionTypes.GET_CATEGORIES });
  try {
    const response: MenuResDTO = await fetch('/api/menu').then(r => r.json());
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

export const addIngredient = async (
  dispatch: Dispatch<MenuActions>,
  ingredient: AddIngredientReqDTO
) => {
  dispatch({
    type: MenuActionTypes.ADD_INGREDIENT,
    payload: ingredient
  });
  try {
    const response: IngredientResDTO = await fetch('/api/menu/ingredients', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token.toString()
      })
    }).then(r => r.json());
    if (!response || !response.ingredient) {
      return dispatch({
        type: MenuActionTypes.ADD_INGREDIENT_FAIL,
        payload: 'Failed'
      });
    }
    return dispatch({
      type: MenuActionTypes.ADD_INGREDIENT_SUCCESS,
      payload: response.ingredient
    });
  } catch (error) {
    return dispatch({
      type: MenuActionTypes.ADD_INGREDIENT_FAIL,
      payload: error
    });
  }
};

export const addCategory = async (
  dispatch: Dispatch<MenuActions>,
  category: AddCategoryReqDTO
) => {
  dispatch({
    type: MenuActionTypes.ADD_CATEGORY,
    payload: category
  });
  try {
    const response: CategoryItemResDTO = await fetch('/api/menu', {
      method: 'POST',
      body: JSON.stringify(category),
      headers: new Headers({
        'content-type': 'application/json',
        'x-auth-token': localStorage.token.toString()
      })
    }).then(r => r.json());
    if (!response || !response.items) {
      dispatch({
        type: MenuActionTypes.ADD_CATEGORY_FAIL,
        payload: 'Failed'
      });
      return;
    }
    dispatch({
      type: MenuActionTypes.ADD_CATEGORY_SUCCESS,
      payload: response
    });
  } catch (err) {
    dispatch({ type: MenuActionTypes.ADD_CATEGORY_FAIL, payload: 'Failed' });
  }
};

export const addCategoryItem = async (
  dispatch: Dispatch<MenuActions>,
  categoryItem: CategoryItemReqDTO
) => {
  dispatch({
    type: MenuActionTypes.ADD_CATEGORY_ITEM,
    payload: categoryItem
  });
  try {
    const response: CategoryItemResDTO = await fetch(
      `/api/menu/category/items`,
      {
        method: 'POST',
        body: JSON.stringify(categoryItem),
        headers: new Headers({
          'content-type': 'application/json',
          'x-auth-token': localStorage.token.toString()
        })
      }
    ).then(r => r.json());
    if (!response || !response.items) {
      dispatch({
        type: MenuActionTypes.ADD_CATEGORY_ITEM_FAIL,
        payload: 'Failed'
      });
      return;
    }
    dispatch({
      type: MenuActionTypes.ADD_CATEGORY_ITEM_SUCCESS,
      payload: response
    });
  } catch (err) {
    dispatch({
      type: MenuActionTypes.ADD_CATEGORY_ITEM_FAIL,
      payload: 'Failed'
    });
  }
};
export const loadItems = async (
  dispatch: Dispatch<MenuActions>,
  selectedCategory: Category
) => {
  dispatch({
    type: MenuActionTypes.GET_CATEGORY_ITEMS,
    payload: selectedCategory
  });
  try {
    const response: CategoryItemResDTO = await fetch(
      `/api/menu/${selectedCategory._id}`,
      {
        method: 'GET',
        headers: new Headers({
          'x-auth-token': localStorage.token.toString()
        })
      }
    ).then(r => r.json());

    if (!response || !response.items) {
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
