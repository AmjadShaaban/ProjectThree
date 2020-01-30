import {
  Category,
  CategoryItem,
  Ingredient,
  IngredientTypes
} from '../../interfaces';
export interface MenuState {
  isMenuLoading: boolean;
  menu: Category[];
  specials: CategoryItem[];
  categoryItems: CategoryItem[];
  items: CategoryItem[];
  ingredients: Ingredient[];
  selectedCategory: Category | null;
  selectedIngredient: Ingredient | null;
  show: boolean;
  error: string | null;
}

export const initialState: MenuState = {
  isMenuLoading: true,
  menu: [],
  specials: [],
  categoryItems: [],
  items: [],
  ingredients: [],
  selectedCategory: null,
  selectedIngredient: null,
  show: false,
  error: null
};
export interface AddCategoryReqDTO {
  name: string;
  disc: string;
  iconLine1: string;
  iconLine2: string;
  iconLine3: string;
}
export interface AuthTokenDTO {
  token: string;
}
export interface CategoryItemReqDTO {
  catId: string;
  name: string;
}
export interface AddSpecialItemReqDTO {
  _id?: string;
  name: string;
  disc: string;
  iconLine1: string;
  iconLine2: string;
  iconLine3: string;
  price: number;
  items: CategoryItem[];
}
export interface AddIngredientReqDTO {
  _id?: string;
  name: string;
  type: IngredientTypes;
  isTopping: boolean;
  price: number;
}
export interface CategoryResDTO {
  item: Category;
}
export interface MenuResDTO {
  categories: Category[];
}
export interface SpecialsResDTO {
  specials: CategoryItem[];
}
export interface IngredientsResDTO {
  ingredients: Ingredient[];
}
export interface ItemsResDTO {
  items: CategoryItem[];
}
export interface ItemResDTO {
  _id?: string;
  name?: string;
  items: CategoryItem[];
}
export interface SpecialItemResDTO {
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
  GET_INGREDIENTS = 'GET_INGREDIENTS',
  GET_INGREDIENTS_FAIL = 'ADD_INGREDIENTS_FAIL',
  GET_INGREDIENTS_SUCCESS = 'ADD_INGREDIENTS_SUCCESS',
  SELECT_CATEGORY = 'SELECT_CATEGORY',
  ADD_CATEGORY = 'ADD_CATEGORY',
  ADD_CATEGORY_FAIL = 'ADD_CATEGORY_FAIL',
  ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS',
  ADD_CATEGORY_ITEM = 'ADD_CATEGORY_ITEM',
  ADD_CATEGORY_ITEM_FAIL = 'ADD_CATEGORY_ITEM_FAIL',
  ADD_CATEGORY_ITEM_SUCCESS = 'ADD_CATEGORY_ITEM_SUCCESS',
  ADD_INGREDIENT = 'ADD_INGREDIENT',
  ADD_INGREDIENT_FAIL = 'ADD_INGREDIENT_FAIL',
  ADD_INGREDIENT_SUCCESS = 'ADD_INGREDIENT_SUCCESS',
  GET_ALL_ITEMS_SUCCESS = 'GET_ALL_ITEMS_SUCCESS',
  GET_ALL_ITEMS_FAIL = 'GET_ALL_ITEMS_FAIL',
  GET_ALL_ITEMS = 'GET_ALL_ITEMS',
  ADD_SPECIAL = 'ADD_SPECIAL',
  ADD_SPECIAL_FAIL = 'ADD_SPECIAL_FAIL',
  ADD_SPECIAL_SUCCESS = 'ADD_SPECIAL_SUCCESS',
  GET_SPECIALS = 'GET_SPECIALS',
  GET_SPECIALS_FAIL = 'GET_SPECIALS_FAIL',
  GET_SPECIALS_SUCCESS = 'GET_SPECIALS_SUCCESS'
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
interface AddItemAction {
  type: typeof MenuActionTypes.ADD_CATEGORY_ITEM;
  payload: CategoryItemReqDTO;
}
interface AddSpecialAction {
  type: typeof MenuActionTypes.ADD_SPECIAL;
  payload: AddSpecialItemReqDTO;
}
interface AddSpecialFailAction {
  type: typeof MenuActionTypes.ADD_SPECIAL_FAIL;
  payload: string;
}
interface AddSpecialSuccessAction {
  type: typeof MenuActionTypes.ADD_SPECIAL_SUCCESS;
  payload: ItemsResDTO;
}

interface AddItemSuccessAction {
  type: typeof MenuActionTypes.ADD_CATEGORY_ITEM_SUCCESS;
  payload: ItemResDTO;
}
interface AddItemFailAction {
  type: typeof MenuActionTypes.ADD_CATEGORY_ITEM_FAIL;
  payload: string;
}
interface AddCategorySuccessAction {
  type: typeof MenuActionTypes.ADD_CATEGORY_SUCCESS;
  payload: Category;
}
interface AddCategoryFailAction {
  type: typeof MenuActionTypes.ADD_CATEGORY_FAIL;
  payload: string;
}
interface GetCategoriesAction {
  type: typeof MenuActionTypes.GET_CATEGORIES;
}
interface GetAllItemsAction {
  type: typeof MenuActionTypes.GET_ALL_ITEMS;
}
interface GetAllItemsSuccessAction {
  type: typeof MenuActionTypes.GET_ALL_ITEMS_SUCCESS;
  payload: CategoryItem[];
}
interface GetAllItemsFailAction {
  type: typeof MenuActionTypes.GET_ALL_ITEMS_FAIL;
  payload: string;
}

interface GetIngredientsAction {
  type: typeof MenuActionTypes.GET_INGREDIENTS;
}
interface GetIngredientsFailAction {
  type: typeof MenuActionTypes.GET_INGREDIENTS_FAIL;
  payload: string;
}
interface GetIngredientsSuccessAction {
  type: typeof MenuActionTypes.GET_INGREDIENTS_SUCCESS;
  payload: Ingredient[];
}

interface GetCategoriesFailAction {
  type: typeof MenuActionTypes.GET_CATEGORIES_FAIL;
  payload: string;
}
interface GetCategoriesSuccessAction {
  type: typeof MenuActionTypes.GET_CATEGORIES_SUCCESS;
  payload: MenuResDTO;
}
interface GetSpecialsAction {
  type: typeof MenuActionTypes.GET_SPECIALS;
}

interface GetSpecialsFailAction {
  type: typeof MenuActionTypes.GET_SPECIALS_FAIL;
  payload: string;
}
interface GetSpecialsSuccessAction {
  type: typeof MenuActionTypes.GET_SPECIALS_SUCCESS;
  payload: SpecialsResDTO;
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
  payload: ItemResDTO;
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
  | AddItemSuccessAction
  | AddItemFailAction
  | AddItemAction
  | GetIngredientsAction
  | GetIngredientsFailAction
  | GetIngredientsSuccessAction
  | GetAllItemsAction
  | GetAllItemsFailAction
  | GetAllItemsSuccessAction
  | AddSpecialSuccessAction
  | AddSpecialFailAction
  | AddSpecialAction
  | GetSpecialsAction
  | GetSpecialsFailAction
  | GetSpecialsSuccessAction;

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
    case MenuActionTypes.GET_INGREDIENTS:
    case MenuActionTypes.GET_SPECIALS:
    case MenuActionTypes.GET_CATEGORIES:
    case MenuActionTypes.GET_ALL_ITEMS:
    case MenuActionTypes.ADD_SPECIAL: {
      return { ...state, isMenuLoading: true, error: null };
    }
    case MenuActionTypes.ADD_INGREDIENT_FAIL:
    case MenuActionTypes.ADD_CATEGORY_FAIL:
    case MenuActionTypes.ADD_CATEGORY_ITEM_FAIL:
    case MenuActionTypes.GET_CATEGORY_ITEMS_FAIL:
    case MenuActionTypes.GET_INGREDIENTS_FAIL:
    case MenuActionTypes.GET_ALL_ITEMS_FAIL:
    case MenuActionTypes.GET_CATEGORIES_FAIL:
    case MenuActionTypes.GET_SPECIALS_FAIL:
    case MenuActionTypes.ADD_SPECIAL_FAIL: {
      return {
        ...state,
        isMenuLoading: false,
        error: action.payload
      };
    }
    case MenuActionTypes.GET_SPECIALS_SUCCESS: {
      return {
        ...state,
        isMenuLoading: false,
        specials: action.payload.specials
      };
    }
    case MenuActionTypes.GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        isMenuLoading: false,
        menu: action.payload.categories
      };
    }
    case MenuActionTypes.GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isMenuLoading: false,
        ingredients: action.payload
      };
    }
    case MenuActionTypes.GET_ALL_ITEMS_SUCCESS: {
      return {
        ...state,
        isMenuLoading: false,
        items: action.payload
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
        categoryItems: action.payload.items
      };
    }
    default: {
      return state;
    }
  }
};
