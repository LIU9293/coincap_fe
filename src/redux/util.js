import { pipe, replace, toUpper } from 'ramda';

// copied from reduxsauce
const RX_CAPS = /(?!^)([A-Z])/g;
const camelToScreamingSnake = pipe(replace(RX_CAPS, '_$1'), toUpper);

export const asyncStateCreator = (...args) => {
  const initialState = {};
  args.forEach(arg => {
    initialState[`${arg}Loading`] = false;
    initialState[`${arg}Success`] = false;
    initialState[`${arg}Error`] = null;
  });
  return initialState;
};

export const asyncActionCreator = (...args) => {
  const actionState = {};
  args.forEach(arg => {
    actionState[`${arg}`] = ['payload'];
    actionState[`${arg}Succeed`] = null;
    actionState[`${arg}Fail`] = ['error'];
  });
  return actionState;
};

export const asyncReducerCreator = (...args) => Types => {
  const reducerState = {};
  args.forEach(arg => {
    reducerState[Types[`${camelToScreamingSnake(arg)}`]] = state => ({
      ...state,
      [`${arg}Loading`]: true,
      [`${arg}Success`]: false,
      [`${arg}Error`]: null,
    });
    reducerState[Types[`${camelToScreamingSnake(arg)}_SUCCEED`]] = state => ({
      ...state,
      [`${arg}Loading`]: false,
      [`${arg}Success`]: true,
      [`${arg}Error`]: null,
    });
    reducerState[Types[`${camelToScreamingSnake(arg)}_FAIL`]] = (
      state,
      { error }
    ) => ({
      ...state,
      [`${arg}Loading`]: false,
      [`${arg}Success`]: false,
      [`${arg}Error`]: error,
    });
  });
  return reducerState;
};
