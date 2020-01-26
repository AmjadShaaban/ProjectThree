import { Dispatch } from 'react';
import {
  OrderActionTypes,
  OrderActions,
  PostOrderReqDTO,
  OrderResDTO
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

export const postOrder = async (
  dispatch: Dispatch<OrderActions>,
  order: PostOrderReqDTO
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
