import { createReducer, createActions } from 'reduxsauce';
import {
  asyncStateCreator,
  asyncActionCreator,
  asyncReducerCreator,
} from '../util';

export const INITIAL_STATE = {
  historyList: [],
  page: 1,
  ...asyncStateCreator('getCoinHistory'),
};

const { Types, Creators } = createActions(
  {
    clearHistoryList: null,
    addHistoryList: ['list'],
    setCoinPage: ['page'],
    ...asyncActionCreator('getCoinHistory'),
  },
  {
    prefix: 'HISTORY_',
  }
);

export const addHistoryList = (state, { list }) => {
  return {
    ...state,
    historyList: state.historyList.concat([list]),
  };
};

export const clearHistoryList = state => {
  return {
    ...state,
    historyList: [],
  };
};

export const setCoinPage = (state, { page }) => {
  return {
    ...state,
    page,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_HISTORY_LIST]: addHistoryList,
  [Types.CLEAR_HISTORY_LIST]: clearHistoryList,
  [Types.SET_COIN_PAGE]: setCoinPage,
  ...asyncReducerCreator('getCoinHistory')(Types),
});

export const CoinHistoryTypes = Types;
export const CoinHistoryActions = Creators;
