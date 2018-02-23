/* global XMLHttpRequest */
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { METADATA_REQUEST } from '../metadataActionTypes';
import { metadataSuccess, metadataFailure } from '../metadataActionCreators';

const printError = err => err.xhr && err.xhr.response || err.stack;

export default actions$ => actions$.ofType(METADATA_REQUEST).switchMap(({ metadataType }) =>
  ajax({
    url: `${process.env.REACT_APP_BACKEND_URL}/api/metadata/${metadataType}`,
    method: 'GET',
    crossDomain: true,
    createXHR: () => new XMLHttpRequest(),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  })
    .map(e => e.response)
    .map(metadata => metadataSuccess(metadataType, metadata))
    .catch(err => Observable.of(metadataFailure(printError(err)))));
