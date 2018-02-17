import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import EntityEditElement from './EntityEditElement';
import EmptyEntityView from './EmptyEntityView';
import { entityLoadRequest, entityUpdateRequest, entityDeleteRequest } from '../state/entityActionCreators';

const mapStateToProps = state => ({
  entity: state.entity.current,
});

const mapDispatchToProps = dispatch => ({
  onSave: entity => () => dispatch(entityUpdateRequest(entity)),
  onCancel: id => () => dispatch(entityLoadRequest(id)),
  onDelete: id => () => dispatch(entityDeleteRequest(id)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  onSave: dispatchProps.onSave(stateProps.entity),
  onCancel: dispatchProps.onCancel(stateProps.entity.id),
  onDelete: dispatchProps.onDelete(stateProps.entity.id),
});

const enhance = (Component, EmptyComponent) => compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
  branch(
    ({ entity }) => entity,
    renderComponent(Component),
    renderComponent(EmptyComponent),
  ),
)(Component);

export default enhance(EntityEditElement, EmptyEntityView);
