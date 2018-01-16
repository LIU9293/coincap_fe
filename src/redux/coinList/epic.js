import { ajax } from 'rxjs/observable/dom/ajax';
import { URL } from 'config';
import { Observable } from 'rxjs/Observable';
import { CoinListTypes, CoinListActions } from './index';

export const getCoinListEpic = action$ =>
  action$.ofType(CoinListTypes.GET_COIN_LIST).switchMap(action =>
    ajax({
      url: `${URL}/coins`,
      method: 'GET',
      responseType: 'json',
    })
      .mergeMap(response => {
        return Observable.of(
          CoinListActions.setCoinList(response.response),
          CoinListActions.getCoinListSucceed()
        );
      })
      .catch(error => Observable.of(CoinListActions.getCoinListFail(error)))
  );
