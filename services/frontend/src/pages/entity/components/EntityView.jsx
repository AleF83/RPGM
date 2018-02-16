import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import PropTypes from 'prop-types';
import { EntityPropType } from './EntityPropTypes';
import { entityModeChange, entityDeleteRequest } from '../state/entityActionCreators';

const EmptyEntityView = () => (
  <div>Nothing to show</div>
);

const EntityView = ({
  entity, message, onEdit, onDelete,
}) => (
  <div style={{ flex: 1, flexDirection: 'column' }}>
    Entity View<br />
    Name: {entity.name} <br />
    Summary: {entity.summary} <br />
    Description: {entity.description}
    <span>{message}</span>
    <button onClick={onEdit}>Edit</button>
    <button onClick={onDelete(entity.id)}>Delete</button>
  </div>
);

EntityView.propTypes = {
  entity: EntityPropType.isRequired,
  message: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

EntityView.defaultProps = {
  message: null,
};

const mapStateToProps = state => ({
  entity: state.entity.current,
  message: state.entity.message,
});

const mapDispatchToProps = dispatch => ({
  onEdit: () => dispatch(entityModeChange('EDIT')),
  onDelete: entityId => () => dispatch(entityDeleteRequest(entityId)),
});

const enhance = Component => compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ entity }) => entity,
    renderComponent(Component),
    renderComponent(EmptyEntityView),
  ),
)(Component);

export default enhance(EntityView);
