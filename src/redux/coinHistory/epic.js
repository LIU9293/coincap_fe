import { ajax } from 'rxjs/observable/dom/ajax';
import { URL } from 'config';
import moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { CoinListTypes } from '../coinList';
import { CoinHistoryTypes, CoinHistoryActions } from './index';

export const setCoinPageEpic = (action$, store) =>
  action$
    .ofType(CoinHistoryTypes.SET_COIN_PAGE)
    .delayWhen(action => {
      const { list } = store.getState().coinList;
      if (list.length > 0) {
        return Observable.timer(0);
      }
      return Observable.timer(10000).takeUntil(
        action$.ofType(CoinListTypes.GET_COIN_LIST_SUCCEED)
      );
    })
    .switchMap(action => {
      const { page } = action;
      const { list } = store.getState().coinList;
      return Observable.of(...list.slice((page - 1) * 9, page * 9));
    })
    .mergeMap(coin => {
      return Observable.of(
        CoinHistoryActions.getCoinHistory({
          coinName: coin.coinName,
        })
      );
    });

export const setCoinPageEpic2 = (action$, store) =>
  action$
    .ofType(CoinHistoryTypes.SET_COIN_PAGE)
    .map(() => CoinHistoryActions.clearHistoryList());

export const getCoinListEpic = action$ =>
  action$
    .ofType(CoinHistoryTypes.GET_COIN_HISTORY)
    // use concatMap here for make request queue
    .concatMap(action => {
      let { coinName, start, end } = action.payload;
      end = end
        ? moment(end).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD');
      start = start
        ? moment(start).format('YYYY-MM-DD')
        : moment()
            .subtract(1, 'months')
            .format('YYYY-MM-DD');
      return ajax({
        url: `${URL}/coin_history/${coinName}?start=${start}&end=${end}`,
        method: 'GET',
        responseType: 'json',
      })
        .switchMap(response => {
          return Observable.of(
            CoinHistoryActions.addHistoryList(response.response),
            CoinHistoryActions.getCoinHistorySucceed()
          );
        })
        .catch(error =>
          Observable.of(CoinHistoryActions.getCoinHistoryFail(error))
        );
    });
