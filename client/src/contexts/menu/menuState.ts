export interface MenuState {
  isMenuLoading: boolean;
  menu: Menu[];
  menuItems: MenuItems | MenuItems[] | null;
  selectedMenu: Menu | null;
  show: boolean;
  error: string | null;
}
export interface Ingredients {
  name: string;
  type: 'cheeses' | 'meets' | 'non-meats';
  isTopping: boolean;
}
interface Menu {
  _id?: string;
  name: string;
  img?: string;
  items?: MenuItems[];
}
export interface MenuItems {
  name: string;
  ingredients?: Ingredients[];
}

export const initialState: MenuState = {
  isMenuLoading: true,
  menu: [],
  menuItems: null,
  selectedMenu: null,
  show: false,
  error: null
};
export interface AddMenuCategoryReqDTO {
  name: string;
}
export interface MenuItemReqDTO {
  _id?: string;
  name?: string;
}
export interface MenuCategoryResDTO {
  name?: string;
}
export interface MenuResDTO {
  items: MenuItems[];
}
export interface CategoryItemResDTO {
  items: MenuItems[];
}
export interface IngredientResDTO {
  ingredients: Ingredients[];
}
export enum MenuActionTypes {
  GET_CATEGORIES = 'GET_CATEGORIES',
  GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL',
  GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS',
  GET_CATEGORY_ITEMS_SUCCESS = 'GET_CATEGORY_ITEMS_SUCCESS',
  GET_CATEGORY_ITEMS_FAIL = 'GET_CATEGORY_ITEMS_FAIL',
  GET_CATEGORY_ITEMS = 'GET_CATEGORY_ITEMS',
  SELECT_CATEGORY = 'SELECT_CATEGORY',
  ADD_CATEGORY = 'ADD_CATEGORY',
  ADD_CATEGORY_FAIL = 'ADD_CATEGORY_FAIL',
  ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS',
  ADD_ITEM = 'ADD_ITEM',
  ADD_ITEM_FAIL = 'ADD_ITEM_FAIL',
  ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS'
}
interface AddCategoryAction {
  type: typeof MenuActionTypes.ADD_CATEGORY;
  payload: AddMenuCategoryReqDTO;
}
interface AddCategorySuccessAction {
  type: typeof MenuActionTypes.ADD_CATEGORY_SUCCESS;
  payload: CategoryItemResDTO;
}
interface AddCategoryFailAction {
  type: typeof MenuActionTypes.ADD_CATEGORY_FAIL;
  payload: string;
}
interface GetCategoriesAction {
  type: typeof MenuActionTypes.GET_CATEGORIES;
}

interface GetCategoriesFailAction {
  type: typeof MenuActionTypes.GET_CATEGORIES_FAIL;
  payload: string;
}
interface GetCategoriesSuccessAction {
  type: typeof MenuActionTypes.GET_CATEGORIES_SUCCESS;
  payload: MenuResDTO;
}
interface GetCategoryItemsAction {
  type: typeof MenuActionTypes.GET_CATEGORY_ITEMS;
  payload: MenuItemReqDTO;
}
interface GetCategoryItemsFailAction {
  type: typeof MenuActionTypes.GET_CATEGORY_ITEMS_FAIL;
  payload: string;
}
interface GetCategoryItemsSuccessAction {
  type: typeof MenuActionTypes.GET_CATEGORY_ITEMS_SUCCESS;
  payload: CategoryItemResDTO;
}
interface SelectCategoryAction {
  type: typeof MenuActionTypes.SELECT_CATEGORY;
  payload: Menu | null;
}
export type MenuActions =
  | GetCategoriesFailAction
  | GetCategoriesSuccessAction
  | GetCategoryItemsFailAction
  | SelectCategoryAction
  | GetCategoryItemsAction
  | GetCategoryItemsSuccessAction
  | GetCategoriesAction
  | AddCategoryAction
  | AddCategorySuccessAction
  | AddCategoryFailAction;

export const menuReducer = (
  state = initialState,
  action: MenuActions
): MenuState => {
  switch (action.type) {
    case MenuActionTypes.SELECT_CATEGORY: {
      return { ...state, selectedMenu: action.payload, menuItems: [] };
    }
    case MenuActionTypes.ADD_CATEGORY:
    case MenuActionTypes.GET_CATEGORY_ITEMS:
    case MenuActionTypes.GET_CATEGORIES: {
      return { ...state, isMenuLoading: false, error: null };
    }
    case MenuActionTypes.ADD_CATEGORY_FAIL:
    case MenuActionTypes.GET_CATEGORY_ITEMS_FAIL:
    case MenuActionTypes.GET_CATEGORIES_FAIL: {
      return {
        ...state,
        isMenuLoading: false,
        error: action.payload
      };
    }
    case MenuActionTypes.GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        isMenuLoading: false,
        menu: action.payload.items
      };
    }
    case MenuActionTypes.GET_CATEGORY_ITEMS_SUCCESS: {
      return {
        ...state,
        isMenuLoading: false,
        menuItems: action.payload.items
      };
    }
    default: {
      return state;
    }
  }
};
