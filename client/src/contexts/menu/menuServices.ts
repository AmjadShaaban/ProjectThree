import { Dispatch } from 'react';
import {
  MenuActionTypes,
  MenuActions,
  CategoryItemResDTO,
  MenuCategoryResDTO,
  Ingredient,
  IngredientResDTO,
  AddIngredientReqDTO,
  AddMenuCategoryReqDTO,
  MenuResDTO,
  MenuItemReqDTO
} from './menuState';
export const loadMenu = async (dispatch: Dispatch<MenuActions>) => {
  dispatch({ type: MenuActionTypes.GET_CATEGORIES });
  try {
    const response: MenuResDTO = await fetch('/api/menu').then(r => r.json());
    console.log(response);
    if (!response || !response.items) {
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
  dispatch({ type: MenuActionTypes.ADD_INGREDIENT, payload: ingredient });
  try {
    const response: IngredientResDTO = await fetch('/api/menu/ingredients', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }).then(r => r.json());
    if (!response || !response.ingredient) {
      dispatch({
        type: MenuActionTypes.ADD_INGREDIENT_FAIL,
        payload: 'Failed'
      });
      return;
    }
    dispatch({
      type: MenuActionTypes.ADD_INGREDIENT_SUCCESS,
      payload: response.ingredient
    });
  } catch (error) {}
};
export const addMenuCategory = async (
  dispatch: Dispatch<MenuActions>,
  category: AddMenuCategoryReqDTO
) => {
  dispatch({ type: MenuActionTypes.ADD_CATEGORY, payload: category });
  try {
    const response: CategoryItemResDTO = await fetch('/api/menu', {
      method: 'POST',
      body: JSON.stringify(category),
      headers: new Headers({ 'Content-Type': 'application/json' })
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
export const loadMenuItems = async (
  dispatch: Dispatch<MenuActions>,
  selectedMenu: MenuItemReqDTO
) => {
  dispatch({ type: MenuActionTypes.GET_CATEGORY_ITEMS, payload: selectedMenu });
  console.log(selectedMenu);

  try {
    const response: CategoryItemResDTO = await fetch(
      `/api/menu/${selectedMenu._id}`
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
