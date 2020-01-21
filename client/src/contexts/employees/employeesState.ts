import { User } from '../../interfaces';

export interface EmployeesState {
  isLoading: boolean;
  users: User[];
  error: string | null;
}
export interface EditUserReqDTO {
  _id?: string;
  name?: string;
}
export const initialState: EmployeesState = {
  isLoading: false,
  users: [],
  error: null
};

export enum UserActionTypes {
  GET_USERS = 'GET_USERS',
  GET_USERS_FAIL = 'GET_USERS_FAIL',
  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
  EDIT_USER = 'EDIT_USER',
  EDIT_USER_FAIL = 'EDIT_USER_FAIL',
  EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS'
}

interface EditUserAction {
  type: typeof UserActionTypes.EDIT_USER;
  payload: EditUserReqDTO;
}

export type UsersActions = EditUserAction;

export const employeesReducer = (
  state = initialState,
  action: UsersActions
): EmployeesState => {
  switch (action.type) {
    case UserActionTypes.EDIT_USER: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    default: {
      return state;
    }
  }
};
