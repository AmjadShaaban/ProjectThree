import { User } from '../../interfaces';
export interface RegisterResDTO {
  token: string;
  user: User;
}
export interface AuthResDTO {
  token: string;
  user: User;
}

export interface RegisterReqDTO extends User {
  password: string;
}
export interface LoadUserResDTO {
  user: User;
}
export interface LoadUserReqDTO {
  token: string;
}
export interface LoginResDTO {
  token: string;
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
  token: string | null;
  user: User | null;
  error: string | null;
}

export const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  token: localStorage.token,
  user: null,
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
  payload: LoadUserResDTO;
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
  payload: AuthResDTO;
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
  | LoadUserSuccessAction
  | LogoutAction;

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
        token: action.payload.token
      };
    }
    case AuthActionTypes.LOGIN:
    case AuthActionTypes.REGISTER: {
      return { ...state, isLoading: true, error: '' };
    }

    case AuthActionTypes.LOAD_USER_SUCCESS:
    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
        error: null
      };
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        token: null,
        user: null,
        error: null
      };
    }

    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.REGISTER_FAIL: {
      localStorage.removeItem('token');
      return {
        ...state,
        isLoading: false,
        token: null,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
};
