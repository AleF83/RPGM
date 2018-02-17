import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import EntityViewElement from './EntityViewElement';
import EmptyEntityView from './EmptyEntityView';

import { entityModeChange, entityDeleteRequest } from '../state/entityActionCreators';

const mapStateToProps = state => ({
  entity: state.entity.current,
});

const mapDispatchToProps = dispatch => ({
  onEdit: () => dispatch(entityModeChange('EDIT')),
  onDelete: entityId => () => dispatch(entityDeleteRequest(entityId)),
});

const enhance = (Component, EmptyComponent) => compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    ({ entity }) => entity,
    renderComponent(Component),
    renderComponent(EmptyComponent),
  ),
)(Component);

export default enhance(EntityViewElement, EmptyEntityView);

