export interface MenuState {
  isLoading: boolean;
  categories: Category[];
  categoryItems: CategoryItem[];
  selectedCategory: Category | null;
  error: string | null;
}
export interface Category {
  id: string;
  src: string;
  title: string;
}
interface CategoryItem {
  id: string;
  src: string;
  title: string;
  categoryId: string;
}
export const initialState: MenuState = {
  isLoading: false,
  categories: [],
  categoryItems: [],
  selectedCategory: null,
  error: null
};
export interface CategoryResDTO {
  categories: Category[];
}
export interface CategoryItemResDTO {
  categoryItems: CategoryItem[];
}
export enum MenuActionTypes {
  GET_CATEGORIES = 'GET_CATEGORIES',
  GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL',
  GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS',
  GET_CATEGORY_ITEMS_SUCCESS = 'GET_CATEGORY_ITEMS_SUCCESS',
  GET_CATEGORY_ITEMS_FAIL = 'GET_CATEGORY_ITEMS_FAIL',
  GET_CATEGORY_ITEMS = 'GET_CATEGORY_ITEMS',
  SELECT_CATEGORY = 'SELECT_CATEGORY'
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
  payload: CategoryResDTO;
}
interface GetCategoryItemsAction {
  type: typeof MenuActionTypes.GET_CATEGORY_ITEMS;
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
  | GetCategoriesAction;

export const menuReducer = (
  state = initialState,
  action: MenuActions
): MenuState => {
  switch (action.type) {
    case MenuActionTypes.SELECT_CATEGORY: {
      return { ...state, selectedCategory: action.payload, categoryItems: [] };
    }
    case MenuActionTypes.GET_CATEGORY_ITEMS:
    case MenuActionTypes.GET_CATEGORIES: {
      return { ...state, isLoading: true, error: null };
    }
    case MenuActionTypes.GET_CATEGORY_ITEMS_FAIL:
    case MenuActionTypes.GET_CATEGORIES_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case MenuActionTypes.GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        categories: action.payload.categories
      };
    }
    case MenuActionTypes.GET_CATEGORY_ITEMS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        categoryItems: action.payload.categoryItems
      };
    }
    default: {
      return state;
    }
  }
};
