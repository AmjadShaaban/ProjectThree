export interface MenuState {
  isMenuLoading: boolean;
  menu: MenuCategory[];
  menuItems: MenuCategoryItem | MenuCategoryItem[] | null;
  selectedMenu: MenuCategory | null;
  selectedIngredient: Ingredient | null;
  show: boolean;
  error: string | null;
}
export enum IngredientTypes {
  CHEESE = 'cheese',
  MEAT = 'meat',
  VEGETABLE = 'vegetable',
  OTHER = 'other'
}
export interface Ingredient {
  _id?: string;
  name: string;
  type: IngredientTypes;
  isTopping: boolean;
}
export interface MenuCategory {
  _id?: string;
  name: string;
  img?: string;
  items?: MenuCategoryItem[];
}
export interface MenuCategoryItem {
  _id?: string;
  name: string;
  ingredients?: Ingredient[];
}

export const initialState: MenuState = {
  isMenuLoading: true,
  menu: [],
  menuItems: null,
  selectedMenu: null,
  selectedIngredient: null,
  show: false,
  error: null
};
export interface AddMenuCategoryReqDTO {
  name: string;
}
export interface AddIngredientReqDTO {
  _id?: string;
  name: string;
  type: IngredientTypes;
  isTopping: boolean;
}
export interface MenuItemReqDTO {
  _id?: string;
  name?: string;
}
export interface MenuCategoryResDTO {
  _id?: string;
  name?: string;
}
export interface MenuResDTO {
  items: MenuCategoryItem[];
}
export interface CategoryItemResDTO {
  items: MenuCategoryItem[];
}
export interface IngredientResDTO {
  ingredient: Ingredient;
}
export enum MenuActionTypes {
  GET_CATEGORIES = 'GET_CATEGORIES',
  GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL',
  GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS',
  GET_CATEGORY_ITEMS_SUCCESS = 'GET_CATEGORY_ITEMS_SUCCESS',
  GET_CATEGORY_ITEMS_FAIL = 'GET_CATEGORY_ITEMS_FAIL',
  GET_CATEGORY_ITEMS = 'GET_CATEGORY_ITEMS',
  GET_INGREDIENT = 'GET_INGREDIENT',
  GET_INGREDIENT_FAIL = 'ADD_INGREDIENT_FAIL',
  GET_INGREDIENT_SUCCESS = 'ADD_INGREDIENT_SUCCESS',
  SELECT_CATEGORY = 'SELECT_CATEGORY',
  ADD_CATEGORY = 'ADD_CATEGORY',
  ADD_CATEGORY_FAIL = 'ADD_CATEGORY_FAIL',
  ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS',
  ADD_ITEM = 'ADD_ITEM',
  ADD_ITEM_FAIL = 'ADD_ITEM_FAIL',
  ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS',
  ADD_INGREDIENT = 'ADD_INGREDIENT',
  ADD_INGREDIENT_FAIL = 'ADD_INGREDIENT_FAIL',
  ADD_INGREDIENT_SUCCESS = 'ADD_INGREDIENT_SUCCESS'
}
interface AddCategoryAction {
  type: typeof MenuActionTypes.ADD_CATEGORY;
  payload: AddMenuCategoryReqDTO;
}
interface AddIngredientAction {
  type: typeof MenuActionTypes.ADD_INGREDIENT;
  payload: AddIngredientReqDTO;
}
interface AddIngredientFailAction {
  type: typeof MenuActionTypes.ADD_INGREDIENT_FAIL;
  payload: string;
}
interface AddIngredientSuccessAction {
  type: typeof MenuActionTypes.ADD_INGREDIENT_SUCCESS;
  payload: Ingredient;
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
  payload: MenuCategory | null;
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
  | AddCategoryFailAction
  | AddIngredientAction
  | AddIngredientSuccessAction
  | AddIngredientFailAction;

export const menuReducer = (
  state = initialState,
  action: MenuActions
): MenuState => {
  switch (action.type) {
    case MenuActionTypes.SELECT_CATEGORY: {
      return { ...state, selectedMenu: action.payload, menuItems: [] };
    }
    case MenuActionTypes.ADD_INGREDIENT:
    case MenuActionTypes.ADD_CATEGORY:
    case MenuActionTypes.GET_CATEGORY_ITEMS:
    case MenuActionTypes.GET_CATEGORIES: {
      return { ...state, isMenuLoading: false, error: null };
    }
    case MenuActionTypes.ADD_INGREDIENT_FAIL:
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
    case MenuActionTypes.ADD_INGREDIENT_SUCCESS: {
      return {
        ...state,
        isMenuLoading: false,
        selectedIngredient: action.payload
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
