import { Dispatch } from 'react';
import {
  OrderActionTypes,
  OrderActions,
  PostOrderReqDTO,
  OrderResDTO
} from './orderState';

export const postOrder = async (
  dispatch: Dispatch<OrderActions>,
  order: PostOrderReqDTO
) => {
  dispatch({ type: OrderActionTypes.CREATE_ORDER, payload: order });
  try {
    const response: OrderResDTO = await fetch('/api/order/new', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: new Headers({
        'content-type': 'application/json',
        'x-auth-token': localStorage.token.toString()
      })
    }).then(r => r.json());
    if (!response || !response.order) {
      return dispatch({
        type: OrderActionTypes.CREATE_ORDER_FAIL,
        payload: 'Server error?'
      });
    }
    return dispatch({
      type: OrderActionTypes.CREATE_ORDER_SUCCESS,
      payload: response
    });
  } catch (error) {
    return dispatch({
      type: OrderActionTypes.CREATE_ORDER_FAIL,
      payload: error
    });
  }
};
