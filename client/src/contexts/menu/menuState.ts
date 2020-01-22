export interface MenuState {
  isMenuLoading: boolean;
  menu: Category[];
  menuItems: CategoryItem[];
  selectedCategory: Category | null;
  selectedIngredient: Ingredient | null;
  show: boolean;
  error: string | null;
}
export enum IngredientTypes {
  CHEESE = 'cheese',
  MEAT = 'meat',
  VEGETABLE = 'vegetable',
  DRESSING = 'dressing',
  SAUCE = 'sauce',
  OTHER = 'other'
}
export interface Ingredient {
  _id?: string;
  name: string;
  type: IngredientTypes;
  isTopping: boolean;
}
export interface Category {
  _id?: string;
  name: string;
  img?: string;
  items?: CategoryItem[];
}
export interface CategoryItem {
  _id?: string;
  name: string;
  img?: string;
  ingredients?: Ingredient[];
}

export const initialState: MenuState = {
  isMenuLoading: true,
  menu: [],
  menuItems: [],
  selectedCategory: null,
  selectedIngredient: null,
  show: false,
  error: null
};
export interface AddCategoryReqDTO {
  name: string;
}
export interface CategoryItemReqDTO {
  catId: string;
  name: string;
}
export interface AddIngredientReqDTO {
  _id?: string;
  name: string;
  type: IngredientTypes;
  isTopping: boolean;
}
export interface CategoryResDTO {
  _id?: string;
  name?: string;
}
export interface MenuResDTO {
  categories: CategoryItem[];
}
export interface CategoryItemResDTO {
  _id?: string;
  name?: string;
  items: CategoryItem[];
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
  ADD_CATEGORY_ITEM = 'ADD_CATEGORY_ITEM',
  ADD_CATEGORY_ITEM_FAIL = 'ADD_CATEGORY_ITEM_FAIL',
  ADD_CATEGORY_ITEM_SUCCESS = 'ADD_CATEGORY_ITEM_SUCCESS',
  ADD_INGREDIENT = 'ADD_INGREDIENT',
  ADD_INGREDIENT_FAIL = 'ADD_INGREDIENT_FAIL',
  ADD_INGREDIENT_SUCCESS = 'ADD_INGREDIENT_SUCCESS'
}
interface AddCategoryAction {
  type: typeof MenuActionTypes.ADD_CATEGORY;
  payload: AddCategoryReqDTO;
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
// interface AddCate
interface AddCategoryItemAction {
  type: typeof MenuActionTypes.ADD_CATEGORY_ITEM;
  payload: CategoryItemReqDTO;
}
interface AddCategoryItemSuccessAction {
  type: typeof MenuActionTypes.ADD_CATEGORY_ITEM_SUCCESS;
  payload: CategoryItemResDTO;
}
interface AddCategoryItemFailAction {
  type: typeof MenuActionTypes.ADD_CATEGORY_ITEM_FAIL;
  payload: string;
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
  payload: Category;
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
  payload: Category | null;
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
  | AddIngredientFailAction
  | AddCategoryItemSuccessAction
  | AddCategoryItemFailAction
  | AddCategoryItemAction;

export const menuReducer = (
  state = initialState,
  action: MenuActions
): MenuState => {
  switch (action.type) {
    case MenuActionTypes.SELECT_CATEGORY: {
      return { ...state, selectedCategory: action.payload };
    }
    case MenuActionTypes.ADD_INGREDIENT:
    case MenuActionTypes.ADD_CATEGORY:
    case MenuActionTypes.ADD_CATEGORY_ITEM:
    case MenuActionTypes.GET_CATEGORY_ITEMS:
    case MenuActionTypes.GET_CATEGORIES: {
      return { ...state, isMenuLoading: false, error: null };
    }
    case MenuActionTypes.ADD_INGREDIENT_FAIL:
    case MenuActionTypes.ADD_CATEGORY_FAIL:
    case MenuActionTypes.ADD_CATEGORY_ITEM_FAIL:
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
        menu: action.payload.categories
      };
    }
    case MenuActionTypes.ADD_CATEGORY_ITEM_SUCCESS: {
      return { ...state, isMenuLoading: false };
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
