import React, {
  createContext,
  FC,
  useContext,
  useReducer,
  Dispatch
} from 'react';
import { MenuState, initialState, menuReducer, MenuActions } from './menuState';

const MenuStateContext = createContext<MenuState | undefined>(undefined);
const MenuDispatchContext = createContext<Dispatch<MenuActions> | undefined>(
  undefined
);

export const MenuProvider: FC = props => {
  const [state, dispatch] = useReducer(menuReducer, initialState);
  return (
    <MenuStateContext.Provider value={state}>
      <MenuDispatchContext.Provider value={dispatch}>
        {props.children}
      </MenuDispatchContext.Provider>
    </MenuStateContext.Provider>
  );
};

export const useMenuState = () => {
  const state = useContext(MenuStateContext);
  if (state === undefined) {
    throw new Error(
      'useMenuState must be called inside a subtree of MenuStateContext Provider'
    );
  }
  return state;
};

export const useMenuDispatch = () => {
  const dispatch = useContext(MenuDispatchContext);
  if (dispatch === undefined) {
    throw new Error(
      'useMenuDispatch must be called inside a subtree of MenuStateContext Provider'
    );
  }
  return dispatch;
};
