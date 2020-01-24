export enum Roles {
  DRIVER = 'DRIVER',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN',
  UNKNOWN = 'UNKNOWN'
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

export interface User {
  email: string;
  fName: string;
  lName: string;
  fullName?: string;
  role?: Roles;
}
