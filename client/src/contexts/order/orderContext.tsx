import React, {
    createContext,
    FC,
    useContext,
    useReducer,
    Dispatch
  } from 'react';
  import { OrderState, initialState, orderReducer, OrderActions } from './orderState';
  
  const OrderStateContext = createContext<OrderState | undefined>(undefined);
  const OrderDispatchContext = createContext<Dispatch<OrderActions> | undefined>(
    undefined
  );
  
  export const OrderProvider: FC = props => {
    const [state, dispatch] = useReducer(orderReducer, initialState);
    return (
      <OrderStateContext.Provider value={state}>
        <OrderDispatchContext.Provider value={dispatch}>
          {props.children}
        </OrderDispatchContext.Provider>
      </OrderStateContext.Provider>
    );
  };
  
  export const useOrderState = () => {
    const state = useContext(OrderStateContext);
    if (state === undefined) {
      throw new Error(
        'useOrderState must be called inside a subtree of OrderStateContext Provider'
      );
    }
    return state;
  };
  
  export const useOrderDispatch = () => {
    const dispatch = useContext(OrderDispatchContext);
    if (dispatch === undefined) {
      throw new Error(
        'useOrderDispatch must be called inside a subtree of OrderStateContext Provider'
      );
    }
    return dispatch;
  };
  