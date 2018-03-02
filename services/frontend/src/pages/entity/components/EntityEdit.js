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
} from '../state/entityActionCreators';
import { imageUploadRequest } from '../state/imageActionCreators';

const mapStateToProps = state => ({
  entity: state.entity.current,
  entityTypes: state.metadata.entityTypes,
  mode: state.entity.mode,
});

const mapDispatchToProps = dispatch => ({
  onCreate: entity => () => dispatch(entityCreateRequest(entity)),
  onUpdate: entity => () => dispatch(entityUpdateRequest(entity)),
  onCancel: () => dispatch(entityUpdateReset()),
  onDelete: entityId => () => dispatch(entityDeleteRequest(entityId)),
  onChange: ({ target }) => dispatch(entityPropertyChange(target.name, target.value)),
  onAvatarChange: entityId => ({ target }) =>
    dispatch(imageUploadRequest('avatars', entityId, target.files[0])),
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
});

const enhance = (Component, EmptyComponent) =>
  compose(
    connect(mapStateToProps, mapDispatchToProps, mergeProps),
    branch(({ entity }) => entity, renderComponent(Component), renderComponent(EmptyComponent)),
  )(Component);

export default enhance(EntityEditElement, EmptyEntityView);
