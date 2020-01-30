import { Category } from '../../interfaces';
import { Dispatch } from 'react';
import {
  MenuActionTypes,
  MenuActions,
  ItemResDTO,
  IngredientResDTO,
  AddIngredientReqDTO,
  AddCategoryReqDTO,
  AddSpecialItemReqDTO,
  MenuResDTO,
  IngredientsResDTO,
  CategoryItemReqDTO,
  CategoryResDTO,
  ItemsResDTO,
  SpecialsResDTO
} from './menuState';
export const setSelectedCategory = (
  dispatch: Dispatch<MenuActions>,
  category: Category | null
) => {
  dispatch({ type: MenuActionTypes.SELECT_CATEGORY, payload: category });
};

export const loadIngredients = async (dispatch: Dispatch<MenuActions>) => {
  dispatch({ type: MenuActionTypes.GET_INGREDIENTS });
  try {
    const response: IngredientsResDTO = await fetch('/api/menu/ingredients', {
      headers: new Headers({
        'x-auth-token': localStorage.token.toString()
      })
    }).then(r => r.json());
    if (!response || !response.ingredients) {
      return dispatch({
        type: MenuActionTypes.GET_INGREDIENTS_FAIL,
        payload: 'Unable to retrieve ingredients'
      });
    }
    dispatch({
      type: MenuActionTypes.GET_INGREDIENTS_SUCCESS,
      payload: response.ingredients
    });
  } catch (error) {
    dispatch({
      type: MenuActionTypes.GET_INGREDIENTS_FAIL,
      payload: error
    });
  }
};
export const loadSpecials = async (dispatch: Dispatch<MenuActions>) => {
  dispatch({ type: MenuActionTypes.GET_SPECIALS });
  try {
    const response: SpecialsResDTO = await fetch('/api/menu/specials', {
      headers: new Headers({
        'x-auth-token': localStorage.token.toString()
      })
    }).then(r => r.json());
    if (!response || !response.specials) {
      return dispatch({
        type: MenuActionTypes.GET_SPECIALS_FAIL,
        payload: 'Unable to fetch Specials'
      });
    }
    dispatch({
      type: MenuActionTypes.GET_SPECIALS_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch({ type: MenuActionTypes.GET_SPECIALS_FAIL, payload: error });
  }
};
export const loadMenu = async (dispatch: Dispatch<MenuActions>) => {
  dispatch({ type: MenuActionTypes.GET_CATEGORIES });
  try {
    const response: MenuResDTO = await fetch('/api/menu', {
      headers: new Headers({
        'x-auth-token': localStorage.token.toString()
      })
    }).then(r => r.json());
    if (!response || !response.categories) {
      return dispatch({
        type: MenuActionTypes.GET_CATEGORIES_FAIL,
        payload: 'Unable to retrieve menu'
      });
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
    const response: CategoryResDTO = await fetch('/api/menu', {
      method: 'POST',
      body: JSON.stringify(category),
      headers: new Headers({
        'content-type': 'application/json',
        'x-auth-token': localStorage.token.toString()
      })
    }).then(r => r.json());
    if (!response || !response.item) {
      dispatch({
        type: MenuActionTypes.ADD_CATEGORY_FAIL,
        payload: 'Failed'
      });
      return false;
    }
    dispatch({
      type: MenuActionTypes.ADD_CATEGORY_SUCCESS,
      payload: response.item
    });
    return true;
  } catch (err) {
    dispatch({ type: MenuActionTypes.ADD_CATEGORY_FAIL, payload: 'Failed' });
    return false;
  }
};
export const addSpecialItem = async (
  dispatch: Dispatch<MenuActions>,
  specialItem: AddSpecialItemReqDTO
) => {
  dispatch({
    type: MenuActionTypes.ADD_SPECIAL,
    payload: specialItem
  });
  try {
    const response: ItemResDTO = await fetch(`/api/menu/specials/`, {
      method: 'POST',
      body: JSON.stringify(specialItem),
      headers: new Headers({
        'content-type': 'application/json',
        'x-auth-token': localStorage.token.toString()
      })
    }).then(r => r.json());
    if (!response || !response.items) {
      dispatch({
        type: MenuActionTypes.ADD_SPECIAL_FAIL,
        payload: 'Failed'
      });
      return;
    }
    dispatch({
      type: MenuActionTypes.ADD_SPECIAL_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: MenuActionTypes.ADD_SPECIAL_FAIL,
      payload: 'Failed'
    });
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
    const response: ItemResDTO = await fetch(`/api/menu/category/items`, {
      method: 'POST',
      body: JSON.stringify(categoryItem),
      headers: new Headers({
        'content-type': 'application/json',
        'x-auth-token': localStorage.token.toString()
      })
    }).then(r => r.json());
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

export const loadCategoryItems = async (
  dispatch: Dispatch<MenuActions>,
  selectedCategory: Category
) => {
  dispatch({
    type: MenuActionTypes.GET_CATEGORY_ITEMS,
    payload: selectedCategory
  });
  try {
    const response: ItemResDTO = await fetch(
      `/api/menu/${selectedCategory._id}`,
      {
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
export const loadItems = async (dispatch: Dispatch<MenuActions>) => {
  dispatch({
    type: MenuActionTypes.GET_ALL_ITEMS
  });
  try {
    const response: ItemsResDTO = await fetch(`/api/menu/items`, {
      headers: new Headers({
        'x-auth-token': localStorage.token.toString()
      })
    }).then(r => r.json());

    if (!response || !response.items) {
      dispatch({
        type: MenuActionTypes.GET_ALL_ITEMS_FAIL,
        payload: 'Unable to retrieve items'
      });
      return;
    }

    dispatch({
      type: MenuActionTypes.GET_ALL_ITEMS_SUCCESS,
      payload: response.items
    });
  } catch (error) {
    dispatch({
      type: MenuActionTypes.GET_ALL_ITEMS_FAIL,
      payload: 'Unable to retrieve items'
    });
  }
};
