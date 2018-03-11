/* global XMLHttpRequest */
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { IMAGE_UPLOAD_REQUEST } from '../imageActionTypes';
import { imageUploadSuccess, imageUploadFailure } from '../imageActionCreators';
import { entityPropertyChange } from '../entityActionCreators';

import { printError } from '../../../../common/utils';

export default (actions$, store) =>
  actions$.ofType(IMAGE_UPLOAD_REQUEST).switchMap(({ category, entityId, imageFile }) =>
    ajax({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/images/${category}/${entityId}`,
      method: 'POST',
      crossDomain: true,
      createXHR: () => new XMLHttpRequest(),
      body: imageFile,
      headers: {
        Accept: 'application/json',
        'Content-Type': imageFile.type,
        Authorization: `Bearer ${store.getState().auth.idToken}`,
      },
    })
      .map(e => e.response)
      .mergeMap(() => [imageUploadSuccess(), entityPropertyChange('avatarType', 'custom')])
      .catch(err => Observable.of(imageUploadFailure(printError(err)))));
