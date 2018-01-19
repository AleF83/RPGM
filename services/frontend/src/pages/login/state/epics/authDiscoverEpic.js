import { Observable } from 'rxjs';

import { AUTH_DISCOVER_REQUEST } from '../authActionTypes';
import { authDiscoverSuccess, authDiscoverFailure } from '../authActionCreators';

import { printError } from '../../../../common/utils';

export default actions$ =>
  actions$.ofType(AUTH_DISCOVER_REQUEST).switchMap(({ providerId, oidcClient }) =>
    Observable.fromPromise(oidcClient.createSigninRequest())
      .map(res => authDiscoverSuccess(providerId, res))
      .catch(err => Observable.of(authDiscoverFailure(printError(err)))));
