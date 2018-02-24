import { METADATA_REQUEST, METADATA_SUCCESS, METADATA_FAILURE } from './metadataActionTypes';

export const metadataRequest = metadataType => ({ type: METADATA_REQUEST, metadataType });

export const metadataSuccess = (metadataType, metadata) => ({
  type: METADATA_SUCCESS,
  metadataType,
  metadata,
});

export const metadataFailure = message => ({ type: METADATA_FAILURE, message });
