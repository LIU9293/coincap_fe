import { ajax } from 'rxjs/observable/dom/ajax';
import { URL } from 'config';
import moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { CoinDetailTypes, CoinDetailActions } from './index';

export const setCoinDetailEpic = action$ =>
  action$.ofType(CoinDetailTypes.GET_DATA).switchMap(action => {
    let { coinName, start, end } = action.payload;
    end = end
      ? moment(end).format('YYYY-MM-DD')
      : moment().format('YYYY-MM-DD');
    start = start
      ? moment(start).format('YYYY-MM-DD')
      : moment()
          .subtract(180, 'days')
          .format('YYYY-MM-DD');

    return ajax({
      url: `${URL}/coin_history/${coinName}?start=${start}&end=${end}`,
      method: 'GET',
      responseType: 'json',
    })
      .mergeMap(response => {
        return Observable.of(
          CoinDetailActions.setData(response.response),
          CoinDetailActions.getDataSucceed()
        );
      })
      .catch(error => Observable.of(CoinDetailActions.getDataFail(error)));
  });
