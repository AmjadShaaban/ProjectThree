import { Dispatch } from 'react';
import {
  AuthActionTypes,
  AuthActions,
  RegisterReqDTO,
  RegisterResDTO,
  LoginReqDTO,
  AuthResDTO
} from './authState';
import axios from 'axios';
import { User } from '../../interfaces';

const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const loadUser = async (dispatch: Dispatch<AuthActions>) => {
  setAuthToken(localStorage.token);
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: AuthActionTypes.LOAD_USER_SUCCESS,
      payload: { user: res.data as User }
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
    }).then(r => r.json());
    if (!response || !response.token) {
      return dispatch({
        type: AuthActionTypes.LOGIN_FAIL,
        payload: 'Unable to Login'
      });
    }
    localStorage.setItem('token', response.token);
    dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: response });
  } catch (error) {
    dispatch({
      type: AuthActionTypes.LOGIN_FAIL,
      payload: 'Unable to Login'
    });
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
      return;
    }
    localStorage.setItem('token', response.token);
    dispatch({ type: AuthActionTypes.REGISTER_SUCCESS, payload: response });
    return true;
  } catch (e) {
    dispatch({
      type: AuthActionTypes.REGISTER_FAIL,
      payload: 'Unable to Register'
    });
    return false;
  }
};
