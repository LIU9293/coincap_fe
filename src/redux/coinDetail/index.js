import { createReducer, createActions } from 'reduxsauce';
import {
  asyncStateCreator,
  asyncActionCreator,
  asyncReducerCreator,
} from '../util';

export const INITIAL_STATE = {
  data: null,
  color: '#5c7cfa',
  ...asyncStateCreator('getData'),
};

const { Types, Creators } = createActions(
  {
    setData: ['data'],
    clearData: null,
    setColor: ['color'],
    ...asyncActionCreator('getData'),
  },
  {
    prefix: 'COIN_',
  }
);

export const setColor = (state, { color }) => {
  return {
    ...state,
    color,
  };
};

export const setData = (state, { data }) => {
  return {
    ...state,
    data,
  };
};

export const clearData = () => {
  return INITIAL_STATE;
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_DATA]: setData,
  [Types.CLEAR_DATA]: clearData,
  [Types.SET_COLOR]: setColor,
  ...asyncReducerCreator('getData')(Types),
});

export const CoinDetailTypes = Types;
export const CoinDetailActions = Creators;
