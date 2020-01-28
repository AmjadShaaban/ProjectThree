import { Order } from '../../interfaces';

export interface OrderState {
  orders: Order[] | null;
  order: Order | null;
  error: string | null;
}

export const initialState: OrderState = {
  orders: null,
  order: null,
  error: null
};
export interface PostOrderReqDTO {
  order: Order;
}
export interface OrderResDTO {
  order: Order;
}
// export interface OrdersReqDTO {
//   query: string;
// }
export interface CompleteOrderReqDTO {
  isOpen: boolean;
}
export interface OrdersResDTO {
  orders: Order[];
}
export enum OrderActionTypes {
  CREATE_ORDER = 'CREATE_ORDER',
  CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL',
  CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS',
  SET_ORDER = 'SET_ORDER',
  GET_ORDERS = 'GET_ORDERS',
  GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS',
  GET_ORDERS_FAIL = 'GET_ORDERS_FAIL',
  COMPLETE_ORDER = 'CREATE_ORDER',
  COMPLETE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS',
  COMPLETE_ORDER_FAIL = 'CREATE_ORDER_FAIL'
}
interface CompleteOrderAction {
  type: typeof OrderActionTypes.COMPLETE_ORDER;
  payload: CompleteOrderReqDTO;
}
interface GetOrdersAction {
  type: typeof OrderActionTypes.GET_ORDERS;
}
interface GetOrdersSuccessAction {
  type: typeof OrderActionTypes.GET_ORDERS_SUCCESS;
  payload: Order[];
}
interface GetOrdersFailAction {
  type: typeof OrderActionTypes.GET_ORDERS_FAIL;
  payload: string;
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
  | SetOrderAction
  | GetOrdersAction
  | GetOrdersFailAction
  | GetOrdersSuccessAction;

export const orderReducer = (
  state = initialState,
  action: OrderActions
): OrderState => {
  switch (action.type) {
    case OrderActionTypes.GET_ORDERS_SUCCESS: {
      return {
        ...state,
        orders: action.payload
      };
    }
    case OrderActionTypes.GET_ORDERS:
    case OrderActionTypes.CREATE_ORDER: {
      return {
        ...state,
        error: null
      };
    }
    case OrderActionTypes.GET_ORDERS_FAIL:
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
