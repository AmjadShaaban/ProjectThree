import React, {
  createContext,
  FC,
  useContext,
  useReducer,
  Dispatch
} from 'react';
import { AuthState, initialState, authReducer, AuthActions } from './authState';

const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<Dispatch<AuthActions> | undefined>(
  undefined
);

export const AuthProvider: FC = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const state = useContext(AuthStateContext);

  if (state === undefined) {
    throw new Error(
      'useAuthState must be called inside a subtree of AuthStateContext Provider'
    );
  }

  return state;
};

export const useAuthDispatch = () => {
  const dispatch = useContext(AuthDispatchContext); //'dis'
  if (dispatch === undefined) {
    throw new Error(
      'useAuthDispatch must be called inside a subtree of AuthStateContext Provider'
    );
  }
  return dispatch;
};
