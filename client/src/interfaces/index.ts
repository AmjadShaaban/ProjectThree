export enum Roles {
  DRIVER = 'DRIVER',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN',
  COOK = 'COOK',
  UNKNOWN = 'UNKNOWN'
}

export enum OrderTypes {
  PICKUP = 'Pick-up',
  DELIVERY = 'Delivery',
  ORDER_IN = 'Order-in'
}
export enum IngredientTypes {
  CHEESE = 'Cheese',
  MEAT = 'Meat',
  VEGETABLE = 'Vegetable',
  DRESSING = 'Dressing',
  SAUCE = 'Sauce',
  OTHER = 'Other'
}
export interface SVGIconData {
  line1: string;
  line2: string;
  line3: string;
}
export interface User {
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  role: Roles;
}
export interface Ingredient {
  _id?: string;
  name: string;
  type?: IngredientTypes;
  isTopping?: boolean;
  price?: number;
}
export interface Category {
  _id?: string;
  name: string;
  disc: string;
  iconData: SVGIconData;
  items: CategoryItem[];
}
export interface CategoryItem {
  _id?: string;
  name: string;
  disc: string;
  price: number;
  iconData: SVGIconData;
  ingredients?: Ingredient[];
}
export interface Order {
  _id?: string;
  type: OrderTypes;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  orderItems: CategoryItem[];
}
