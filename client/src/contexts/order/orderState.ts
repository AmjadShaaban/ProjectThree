import { Order } from '../../interfaces';

export interface OrderState {
  order: Order | null;
  error: string | null;
}

export const initialState: OrderState = {
  order: null,
  error: null
};
export interface PostOrderReqDTO {
  order: Order;
}
export interface OrderResDTO {
  order: Order;
}
export enum OrderActionTypes {
  CREATE_ORDER = 'CREATE_ORDER',
  CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL',
  CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS',
  SET_ORDER = 'SET_ORDER'
}
interface SetOrderAction {
  type: typeof OrderActionTypes.SET_ORDER;
  payload: Order | null;
}
interface CreateOrderAction {
  type: typeof OrderActionTypes.CREATE_ORDER;
  payload: PostOrderReqDTO;
}
interface CreateOrderFailAction {
  type: typeof OrderActionTypes.CREATE_ORDER_FAIL;
  payload: string;
}
interface CreateOrderSuccessAction {
  type: typeof OrderActionTypes.CREATE_ORDER_SUCCESS;
  payload: OrderResDTO;
}
export type OrderActions =
  | CreateOrderAction
  | CreateOrderFailAction
  | CreateOrderSuccessAction
  | SetOrderAction;

export const orderReducer = (
  state = initialState,
  action: OrderActions
): OrderState => {
  switch (action.type) {
    case OrderActionTypes.CREATE_ORDER: {
      return {
        ...state,
        error: null
      };
    }
    case OrderActionTypes.CREATE_ORDER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case OrderActionTypes.SET_ORDER: {
      return {
        ...state,
        order: action.payload
      };
    }
    default:
      return state;
  }
};
