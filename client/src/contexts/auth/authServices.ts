import { Dispatch } from 'react';
import {
  AuthActionTypes,
  AuthActions,
  RegisterReqDTO,
  RegisterResDTO,
  LoginReqDTO,
  LoginResDTO
} from './authState';

export const loginUser = async (
  dispatch: Dispatch<AuthActions>,
  userForm: LoginReqDTO
) => {
  dispatch({ type: AuthActionTypes.LOGIN, payload: userForm });
  try {
    const response: LoginResDTO = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(userForm),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }).then(r => r.json());
    if (!response || !response.user || !response.user.token) {
      dispatch({
        type: AuthActionTypes.LOGIN_FAIL,
        payload: 'Unable to Login'
      });
      return;
    }
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

    if (!response || !response.user || !response.user.token) {
      dispatch({
        type: AuthActionTypes.REGISTER_FAIL,
        payload: 'Unable to Register'
      });
      return;
    }

    dispatch({ type: AuthActionTypes.REGISTER_SUCCESS, payload: response });
  } catch (e) {
    dispatch({
      type: AuthActionTypes.REGISTER_FAIL,
      payload: 'Unable to Register'
    });
  }
};
