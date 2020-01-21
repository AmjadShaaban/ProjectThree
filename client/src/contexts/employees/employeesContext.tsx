import React, {
    createContext,
    FC,
    useContext,
    useReducer,
    Dispatch
  } from 'react';
  import { EmployeesState, initialState, employeesReducer, UsersActions } from './employeesState';
  
  const EmployeesStateContext = createContext<EmployeesState | undefined>(undefined);
  const EmployeesDispatchContext = createContext<Dispatch<UsersActions> | undefined>(
    undefined
  );
  
  export const EmployeesProvider: FC = props => {
    const [state, dispatch] = useReducer(employeesReducer, initialState);
    return (
      <EmployeesStateContext.Provider value={state}>
        <EmployeesDispatchContext.Provider value={dispatch}>
          {props.children}
        </EmployeesDispatchContext.Provider>
      </EmployeesStateContext.Provider>
    );
  };
  
  export const useEmployeesState = () => {
    const state = useContext(EmployeesStateContext);
    if (state === undefined) {
      throw new Error(
        'useEmployeesState must be called inside a subtree of MenuStateContext Provider'
      );
    }
    return state;
  };
  
  export const useEmployeesDispatch = () => {
    const dispatch = useContext(EmployeesDispatchContext);
    if (dispatch === undefined) {
      throw new Error(
        'useEmployeesDispatch must be called inside a subtree of MenuStateContext Provider'
      );
    }
    return dispatch;
  };
  