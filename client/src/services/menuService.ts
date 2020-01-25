import axios from 'axios';
import { Ingredient } from '../interfaces';

export const getMenu = () => {
  return axios.get(`/api/menu`);
};

export const addMenuCategory = (name: string) => {
  return axios.post(`/api/menu`, name);
};

export const getCategory = (_id: string) => {
  return axios.get(`/api/menu/category/${_id}`);
};

export const addCategoryItem = (_id: string, name: string) => {
  return axios.post(`/api/menu/category/${_id}/items`, name);
};

export const getItem = (_id: string) => {
  return axios.get(`/api/menu/category/items/${_id}`);
};

export const addIngredient = (ingredient: Ingredient) => {
  return axios.post(`/api/menu/ingredients`, ingredient);
};
