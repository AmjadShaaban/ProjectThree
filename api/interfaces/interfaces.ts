import { Document } from 'mongoose';

export interface Message {
  message: string;
}

export enum IngredientTypes {
  CHEESE = 'cheese',
  MEAT = 'meat',
  VEGETABLE = 'vegetable',
  DRESSING = 'dressing',
  SAUCE = 'sauce',
  OTHER = 'other'
}

export interface IUser extends Document {
  email: string;
  password: string;
  fName: string;
  lName: string;
  fullName?: string;
  employee: boolean;
  driver: boolean;
  manager: boolean;
  admin: boolean;
}

export interface IIngredient extends Document {
  name: string;
  type: IngredientTypes;
  isTopping: boolean;
  price?: string;
}

export interface ICategory extends Document {
  name: string;
  img?: string;
  items?: ICategoryItem[];
}

export interface ICategoryItem extends Document {
  name: string;
  discription: string;
  price: string;
  ingredients?: IIngredient[];
}
