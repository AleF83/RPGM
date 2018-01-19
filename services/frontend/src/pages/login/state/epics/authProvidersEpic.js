/* global XMLHttpRequest */
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { AUTH_PROVIDERS_REQUEST } from '../authActionTypes';
import { authProvidersFailure, authProvidersSuccess } from '../authActionCreators';

import { createAuthClient } from '../../authUtils';
import { printError } from '../../../../common/utils';

export default actions$ =>
  actions$.ofType(AUTH_PROVIDERS_REQUEST).switchMap(() =>
    ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/auth/providers`,
      method: 'GET',
      crossDomain: true,
      createXHR: () => new XMLHttpRequest(),
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
      .map(e => e.response.map(ap => createAuthClient(ap)))
      .map(res => authProvidersSuccess(res))
      .catch(err => Observable.of(authProvidersFailure(printError(err)))));
