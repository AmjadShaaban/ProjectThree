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
export enum Roles {
  DRIVER = 'DRIVER',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN',
  UNKNOWN = 'UNKNOWN'
}
export interface IUser extends Document {
  email: string;
  password: string;
  fName: string;
  lName: string;
  fullName?: string;
  role?: Roles;
}

export interface IIngredient extends Document {
  name: string;
  type: IngredientTypes;
  isTopping: boolean;
  price?: string;
}

export interface ICategory extends Document {
  name: string;
  img: string;
  disc: string;
  items: ICategoryItem[];
}
export interface ISpecial extends Document {
  name: string;
  disc: string;
  img: string;
  items: ISpecialItem[];
}

export interface ICategoryItem extends Document {
  name: string;
  disc: string;
  price: string;
  ingredients?: IIngredient[];
}

export interface ISpecialItem extends Document {
  name: string;
  disc: string;
  price: string;
  items: ICategoryItem[];
}
