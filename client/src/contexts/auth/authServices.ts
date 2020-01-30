import { Dispatch } from 'react';
import {
  AuthActionTypes,
  AuthActions,
  RegisterReqDTO,
  RegisterResDTO,
  LoginReqDTO,
  AuthResDTO,
  LoadUserResDTO
} from './authState';

export const loadUser = async (dispatch: Dispatch<AuthActions>) => {
  dispatch({ type: AuthActionTypes.LOAD_USER });
  try {
    const res: LoadUserResDTO = await fetch('/api/auth', {
      headers: new Headers({
        'x-auth-token': localStorage.token.toString()
      })
    }).then(r => r.json());
    dispatch({
      type: AuthActionTypes.LOAD_USER_SUCCESS,
      payload: res
    });
  } catch (error) {
    dispatch({
      type: AuthActionTypes.LOAD_USER_FAIL,
      payload: 'Auth Error'
    });
  }
};

export const logoutUser = (dispatch: Dispatch<AuthActions>) => {
  localStorage.removeItem('token');
  dispatch({ type: AuthActionTypes.LOGOUT });
};

export const loginUser = async (
  dispatch: Dispatch<AuthActions>,
  userForm: LoginReqDTO
) => {
  dispatch({ type: AuthActionTypes.LOGIN, payload: userForm });
  try {
    const response: AuthResDTO = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(userForm),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(r => r.json())
      .then(res => {
        if (res.message && res.message.errors) {
          throw new Error(res.message.errors[0].msg);
        }
        return res;
      });

    if (!response || !response.token) {
      dispatch({
        type: AuthActionTypes.LOGIN_FAIL,
        payload: 'Unable to Login'
      });
      return false;
    }
    localStorage.setItem('token', response.token);
    dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: response });
    return true;
  } catch (error) {
    console.log('we caught this error', { error });
    dispatch({
      type: AuthActionTypes.LOGIN_FAIL,
      payload: error.message
    });
    return false;
  }
};
export const registerUser = async (
  dispatch: Dispatch<AuthActions>,
  userForm: RegisterReqDTO
) => {
  dispatch({ type: AuthActionTypes.REGISTER, payload: userForm });

  try {
    const response: RegisterResDTO = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(userForm),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }).then(r => r.json());

    if (!response || !response.token) {
      dispatch({
        type: AuthActionTypes.REGISTER_FAIL,
        payload: 'Unable to Register'
      });
      localStorage.removeItem('token');
      return false;
    }
    localStorage.setItem('token', response.token);
    dispatch({ type: AuthActionTypes.REGISTER_SUCCESS, payload: response });
    return true;
  } catch (e) {
    dispatch({
      type: AuthActionTypes.REGISTER_FAIL,
      payload: 'Unable to Register'
    });
    localStorage.removeItem('token');
    return false;
  }
};
