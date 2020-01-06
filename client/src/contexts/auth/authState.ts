interface User {
  fName: string;
  lName: string;
  token: string;
  admin: boolean;
}

export interface RegisterResDTO {
  user: User;
}

export interface RegisterReqDTO {
  fName?: string;
  lName?: string;
  email: string;
  password: string;
}
export interface LoginResDTO {
  user: User;
}

export interface LoginReqDTO {
  email: string;
  password: string;
}

export interface AuthState {
  isLoading: boolean;
  user: User;
  error: string | null;
}

export const initialState: AuthState = {
  isLoading: false,
  user: {
    fName: '',
    lName: '',
    token: '',
    admin: false
  },
  error: null
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
  REGISTER_SUCCESS = 'REGISTER_SUCCESS'
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
export type AuthActions =
  | RegisterAction
  | RegisterFailAction
  | RegisterSuccessAction
  | LoginAction
  | LoginFailAction
  | LoginSuccessAction;

export const authReducer = (
  state = initialState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
    case AuthActionTypes.REGISTER: {
      return { ...state, isLoading: true, error: null };
    }

    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user
      };
    }

    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.REGISTER_FAIL: {
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
