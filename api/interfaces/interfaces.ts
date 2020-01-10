import { Document } from 'mongoose';

export interface Message {
  message: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  fName?: string;
  lName?: string;
  admin: boolean;
}

export interface IIngredient extends Document{
  name: string;
  type: 'cheeses' | 'meets' | 'non-meats';
  isTopping: boolean;
}

export interface IMenu extends Document {
  name: string;
  img?: string; 
  items?: IMenuItem[];
}

export interface IMenuItem extends Document {
  name: string;
  ingredients:IIngredient[]
}