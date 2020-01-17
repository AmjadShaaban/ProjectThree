import { Dispatch } from 'react';
import {
  OrderActionTypes,
  OrderActions,
  CreateOrderReqDTO
} from './orderState';
import { MenuActionTypes } from '../menu';

export const createOrder = async (
  dispatch: Dispatch<OrderActions>,
  order: CreateOrderReqDTO
) => {
  dispatch({ type: OrderActionTypes.CREATE_ORDER, payload: order });
  try {
  } catch (error) {}
};
