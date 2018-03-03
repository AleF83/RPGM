import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import EntityEditElement from './EntityEditElement';
import EmptyEntityView from './EmptyEntityView';
import {
  entityUpdateReset,
  entityCreateRequest,
  entityUpdateRequest,
  entityDeleteRequest,
  entityPropertyChange,
  entityModeChange,
} from '../state/entityActionCreators';
import { imageUploadRequest, imageDeleteRequest } from '../state/imageActionCreators';

const mapStateToProps = state => ({
  entity: state.entity.current,
  entityTypes: state.metadata.entityTypes,
  mode: state.entity.mode,
});

const mapDispatchToProps = dispatch => ({
  onBack: () => dispatch(entityModeChange('LIST')),
  onCreate: entity => () => dispatch(entityCreateRequest(entity)),
  onUpdate: entity => () => dispatch(entityUpdateRequest(entity)),
  onCancel: () => dispatch(entityUpdateReset()),
  onDelete: entityId => () => dispatch(entityDeleteRequest(entityId)),
  onChange: ({ target }) => dispatch(entityPropertyChange(target.name, target.value)),
  onAvatarChange: entityId => ({ target }) =>
    dispatch(imageUploadRequest('avatars', entityId, target.files[0])),
  onAvatarDelete: entityId => () => dispatch(imageDeleteRequest('avatars', entityId)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onSave:
    stateProps.mode === 'NEW'
      ? dispatchProps.onCreate(stateProps.entity)
      : dispatchProps.onUpdate(stateProps.entity),
  onDelete: dispatchProps.onDelete(stateProps.entity.id),
  onAvatarChange: dispatchProps.onAvatarChange(stateProps.entity.id),
  onAvatarDelete: dispatchProps.onAvatarDelete(stateProps.entity.id),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
  branch(({ entity }) => !entity, renderComponent(EmptyEntityView)),
);

export default enhance(EntityEditElement);
