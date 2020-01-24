import { Document } from 'mongoose';

export interface Message {
  message: string;
}
export enum OrderTypes {
  PICKUP = 'Pick-up',
  DELIVERY = 'Delivery',
  ORDER_IN = 'Order-in'
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
  COOK = 'COOK',
  UNKNOWN = 'UNKNOWN'
}
export interface ICustomer extends Document {
  name?: string;
  phone: string;
  address?: string;
}
export interface IOrder extends Document {
  type: OrderTypes;
  orderItems: [];
  total: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
}
export interface IDelivery extends IOrder {
  type: OrderTypes.DELIVERY;
  customerName?: string;
  customerPhone: string;
  customerAddress: string;
}
export interface IPickup extends IOrder {
  type: OrderTypes.PICKUP;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
}
export interface IOrderIn extends IOrder {
  type: OrderTypes.ORDER_IN;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
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
