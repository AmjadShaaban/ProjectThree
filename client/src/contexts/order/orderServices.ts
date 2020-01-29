import { Dispatch } from 'react';
import {
  OrderActionTypes,
  OrderActions,
  OrderReqDTO,
  OrderResDTO,
  OrdersResDTO,
  CompleteOrderReqDTO,
  CompleteOrderResDTO
} from './orderState';
import { Order } from '../../interfaces';

export const setOrder = (
  dispatch: Dispatch<OrderActions>,
  order: Order | null
) => {
  dispatch({
    type: OrderActionTypes.SET_ORDER,
    payload: order
  });
};

export const completeOrder = async (
  dispatch: Dispatch<OrderActions>,
  isOpen: CompleteOrderReqDTO,
  _id: string
) => {
  dispatch({
    type: OrderActionTypes.COMPLETE_ORDER
  });
  try {
    const response: CompleteOrderResDTO = await fetch(`/api/orders/${_id}`, {
      method: 'PUT',
      body: JSON.stringify(isOpen),
      headers: new Headers({
        'content-type': 'application/json',
        'x-auth-token': localStorage.token.toString()
      })
    }).then(r => r.json());
    if (!response) {
      return dispatch({
        type: OrderActionTypes.COMPLETE_ORDER_FAIL,
        payload: response
      });
    }
    return dispatch({
      type: OrderActionTypes.COMPLETE_ORDER_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: OrderActionTypes.COMPLETE_ORDER_FAIL,
      payload: error
    });
  }
};

export const getOrders = async (
  dispatch: Dispatch<OrderActions>,
  query: string
) => {
  dispatch({ type: OrderActionTypes.GET_ORDERS });
  try {
    const response: OrdersResDTO = await fetch(`/api/orders${query}`, {
      headers: new Headers({
        'x-auth-token': localStorage.token.toString()
      })
    }).then(r => r.json());
    if (!response || !response.orders) {
      return dispatch({
        type: OrderActionTypes.GET_ORDERS_FAIL,
        payload: 'Unable to fetch orders'
      });
    }
    dispatch({
      type: OrderActionTypes.GET_ORDERS_SUCCESS,
      payload: response.orders
    });
  } catch (error) {
    dispatch({
      type: OrderActionTypes.GET_ORDERS_FAIL,
      payload: 'Unable to fetch orders'
    });
  }
};

export const postOrder = async (
  dispatch: Dispatch<OrderActions>,
  order: OrderReqDTO
) => {
  dispatch({ type: OrderActionTypes.CREATE_ORDER, payload: order });
  try {
    const response: OrderResDTO = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: new Headers({
        'content-type': 'application/json',
        'x-auth-token': localStorage.token.toString()
      })
    }).then(r => r.json());
    if (!response || !response.order) {
      dispatch({
        type: OrderActionTypes.CREATE_ORDER_FAIL,
        payload: 'Server error?'
      });
      return false;
    }
    dispatch({
      type: OrderActionTypes.CREATE_ORDER_SUCCESS,
      payload: response
    });
    return true;
  } catch (error) {
    dispatch({
      type: OrderActionTypes.CREATE_ORDER_FAIL,
      payload: error
    });
    return false;
  }
};
