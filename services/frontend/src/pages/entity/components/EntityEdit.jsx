import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import PropTypes from 'prop-types';
import { EntityPropType } from './EntityPropTypes';
import { entityLoadRequest, entityUpdateRequest, entityDeleteRequest } from '../state/entityActionCreators';


const EmptyEntityView = () => (
  <div>Nothing to show</div>
);

const EntityEdit = ({
  entity, message, onChange, onSave, onCancel, onDelete,
}) => (
  <div style={{ flex: 1, flexDirection: 'column' }}>
    <h4>Entity Edit</h4>
    <input type="text" placeholder="Name" value={entity.name} onChange={onChange} />
    <input type="text" placeholder="Summary" value={entity.summary} onChange={onChange} />
    <input type="text" placeholder="Description" value={entity.description} onChange={onChange} />
    <button onClick={onSave}>Save</button>
    <button onClick={onCancel}>Cancel</button>
    <button onClick={onDelete}>Delete</button>
    <span>{message}</span>
  </div>
);

EntityEdit.propTypes = {
  entity: EntityPropType.isRequired,
  message: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

EntityEdit.defaultProps = {
  message: null,
  name: '',
  summary: '',
  description: '',
};

const mapStateToProps = state => ({
  entity: state.entity.current,
  message: state.entity.message,
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

const enhance = Component => compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
  branch(
    ({ entity }) => entity,
    renderComponent(Component),
    renderComponent(EmptyEntityView),
  ),
)(Component);

export default enhance(EntityEdit);
