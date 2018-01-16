import { createReducer, createActions } from 'reduxsauce';
import {
  asyncStateCreator,
  asyncActionCreator,
  asyncReducerCreator,
} from '../util';

export const INITIAL_STATE = {
  list: [],
  ...asyncStateCreator('getCoinList'),
};

const { Types, Creators } = createActions(
  {
    setCoinList: ['list'],
    ...asyncActionCreator('getCoinList'),
  },
  {
    prefix: 'COIN_LIST_',
  }
);

export const setCoinList = (state, { list }) => {
  return {
    ...state,
    list,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_COIN_LIST]: setCoinList,
  ...asyncReducerCreator('getCoinList')(Types),
});

export const CoinListTypes = Types;
export const CoinListActions = Creators;
