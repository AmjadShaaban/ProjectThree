export enum Roles {
  DRIVER = 'DRIVER',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN',
  UNKNOWN = 'UNKNOWN'
}

export interface User {
  email: string;
  fName: string;
  lName: string;
  fullName?: string;
  role?: Roles;
}
