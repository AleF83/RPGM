import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import EntityViewElement from './EntityViewElement';
import EmptyEntityView from './EmptyEntityView';

import { entityModeChange, entityDeleteRequest } from '../state/entityActionCreators';

const mapStateToProps = state => ({ entity: state.entity.current });

const mapDispatchToProps = dispatch => ({
  onBack: () => dispatch(entityModeChange('LIST')),
  onEdit: () => dispatch(entityModeChange('EDIT')),
  onDelete: entityId => () => dispatch(entityDeleteRequest(entityId)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(({ entity }) => !entity, renderComponent(EmptyEntityView)),
);

export default enhance(EntityViewElement);
