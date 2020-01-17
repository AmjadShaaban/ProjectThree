export interface OrderState {
  pending: boolean;
  order: [] | null;
  total: string | null;
  error: string | null;
}

export enum OrderTypes {
  PICKUP = 'Pick-up',
  DELIVERY = 'Delivery',
  ORDER_IN = 'Order-in'
}

export interface Order {
  type: OrderTypes;
  items: [];
  total: string;
}

export const initialState: OrderState = {
  pending: false,
  order: null,
  total: null,
  error: null
};
export interface CreateOrderReqDTO {
  order: [];
  total: string;
}
export enum OrderActionTypes {
  CREATE_ORDER = 'CREATE_ORDER',
  CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL',
  CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS'
}

interface CreateOrderAction {
  type: typeof OrderActionTypes.CREATE_ORDER;
  payload: CreateOrderReqDTO;
}
interface CreateOrderFailAction {
  type: typeof OrderActionTypes.CREATE_ORDER_FAIL;
  payload: string;
}
export type OrderActions = CreateOrderAction | CreateOrderFailAction;

export const orderReducer = (
  state = initialState,
  action: OrderActions
): OrderState => {
  switch (action.type) {
    case OrderActionTypes.CREATE_ORDER: {
      return {
        ...state,
        pending: false,
        error: null
      };
    }
    case OrderActionTypes.CREATE_ORDER_FAIL: {
      return {
        ...state,
        pending: true,
        error: action.payload
      };
    }

    default:
      return state;
  }
};
