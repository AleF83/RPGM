import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import EntityListElement from './EntityListElement';
import {
  entityListRequest,
  entityLoadRequest,
  entityDeleteRequest,
  entityModeChange,
} from '../state/entityActionCreators';

const mapStateToProps = state => ({
  entities: state.entity.list,
});

const mapDispatchToProps = dispatch => ({
  loadEntities: () => dispatch(entityListRequest()),
  onSelect: entityId => () => dispatch(entityLoadRequest(entityId)),
  onEdit: entityId => () => dispatch(entityLoadRequest(entityId, 'EDIT')),
  onCreate: () => dispatch(entityModeChange('NEW')),
  onRefresh: () => dispatch(entityListRequest()),
  onDelete: entityId => () => dispatch(entityDeleteRequest(entityId)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.loadEntities();
    },
  }),
);

export default enhance(EntityListElement);
