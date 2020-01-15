import { Document } from 'mongoose';

export interface Message {
  message: string;
}

export enum IngredientTypes {
  CHEESE = 'cheese',
  MEAT = 'meat',
  VEGETABLE = 'vegetable',
  OTHER = 'other'
}

export interface IUser extends Document {
  email: string;
  password: string;
  fName?: string;
  lName?: string;
  admin: boolean;
}

export interface IIngredient extends Document {
  name: string;
  type: IngredientTypes;
  isTopping: boolean;
}

export interface ICategory extends Document {
  name: string;
  img?: string;
  items?: ICategoryItem[];
}

export interface ICategoryItem extends Document {
  name: string;
  ingredients?: IIngredient[];
}
