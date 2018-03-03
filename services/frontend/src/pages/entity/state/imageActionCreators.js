import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  IMAGE_DELETE_REQUEST,
} from './imageActionTypes';

export const imageUploadRequest = (category, entityId, imageFile) => ({
  type: IMAGE_UPLOAD_REQUEST,
  category,
  entityId,
  imageFile,
});

export const imageUploadSuccess = () => ({
  type: IMAGE_UPLOAD_SUCCESS,
});

export const imageUploadFailure = message => ({
  type: IMAGE_UPLOAD_FAILURE,
  message,
});

export const imageDeleteRequest = (category, entityId) => ({
  type: IMAGE_DELETE_REQUEST,
  category,
  entityId,
});
