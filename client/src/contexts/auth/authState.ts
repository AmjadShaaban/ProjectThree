interface User {
  email: string;
  fName: string;
  lName: string;
  fullName?: string;
  token: string;
  employee: boolean | null;
  driver: boolean | null;
  manager: boolean | null;
  admin: boolean;
}

export interface RegisterResDTO {
  user: User;
}

export interface RegisterReqDTO {
  token?: string | undefined;
  fName: string;
  lName: string;
  email: string;
  password: string;
  employee: boolean;
  driver: boolean;
  manager: boolean;
  admin: boolean;
}
export interface LoadUserResDTO {
  token: string;
  fullName: string;
  employee: boolean;
  driver: boolean;
  manager: boolean;
  admin: boolean;
}
export interface LoadUserReqDTO {
  token: string;
}
export interface LoginResDTO {
  user: User;
}

export interface LoginReqDTO {
  token?: string;
  email: string;
  password: string;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User;
  error: string;
}

export const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  user: {
    email: '',
    fName: '',
    lName: '',
    fullName: '',
    token: '',
    employee: null,
    driver: null,
    manager: null,
    admin: false
  },
  error: ''
};

// interface LoginAction {
//   type: typeof LOGIN;
//   payload: LoginReqDTO;
// }

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  REGISTER = 'REGISTER',
  REGISTER_FAIL = 'REGISTER_FAIL',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  LOAD_USER = 'LOAD_USER',
  LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS',
  LOAD_USER_FAIL = 'LOAD_USER_FAIL',
  LOGOUT = 'LOGOUT'
}
interface LoadUserAction {
  type: typeof AuthActionTypes.LOAD_USER;
  payload: LoadUserReqDTO;
}
interface LoadUserSuccessAction {
  type: typeof AuthActionTypes.LOAD_USER_SUCCESS;
  payload: User;
}
interface LoadUserFailAction {
  type: typeof AuthActionTypes.LOAD_USER_FAIL;
  payload: string;
}
interface RegisterAction {
  type: typeof AuthActionTypes.REGISTER;
  payload: RegisterReqDTO;
}
interface RegisterFailAction {
  type: typeof AuthActionTypes.REGISTER_FAIL;
  payload: string;
}
interface RegisterSuccessAction {
  type: typeof AuthActionTypes.REGISTER_SUCCESS;
  payload: RegisterResDTO;
}
interface LoginAction {
  type: typeof AuthActionTypes.LOGIN;
  payload: LoginReqDTO;
}
interface LoginFailAction {
  type: typeof AuthActionTypes.LOGIN_FAIL;
  payload: string;
}
interface LoginSuccessAction {
  type: typeof AuthActionTypes.LOGIN_SUCCESS;
  payload: LoginResDTO;
}
interface LogoutAction {
  type: typeof AuthActionTypes.LOGOUT;
}
export type AuthActions =
  | RegisterAction
  | RegisterFailAction
  | RegisterSuccessAction
  | LoginAction
  | LoginFailAction
  | LoginSuccessAction
  | LoadUserAction
  | LoadUserFailAction
  | LoadUserSuccessAction;

export const authReducer = (
  state = initialState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOAD_USER: {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    }
    case AuthActionTypes.LOGIN:
    case AuthActionTypes.REGISTER: {
      return { ...state, isLoading: true, error: '' };
    }

    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.REGISTER_SUCCESS: {
      localStorage.setItem('token', action.payload.user.token);
      return {
        ...state,
        isLoading: false,
        error: '',
        user: action.payload.user
      };
    }

    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.REGISTER_FAIL:
    case AuthActionTypes.LOGOUT: {
      localStorage.removeItem('token');
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
};
