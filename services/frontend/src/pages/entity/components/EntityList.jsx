import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import PropTypes from 'prop-types';
import { EntitySummaryPropType } from './EntityPropTypes';

import EntityListItem from './EntityListItem';
import { entityListRequest, entityLoadRequest, entityDeleteRequest, entityModeChange } from '../state/entityActionCreators';

const EntityList = ({
  entities, current, message, onSelect, onDelete, onCreate,
}) => (
  <div>
    <button>Load</button>
    <table>
      <tbody>
        {
          entities.map(entity =>
            (<EntityListItem
              key={entity.id}
              entity={entity}
              isSelected={current != null && entity.id === current.id}
              onSelect={onSelect}
              onDelete={onDelete}
            />))
        }
      </tbody>
    </table>
    <button onClick={onCreate}>New Entity</button>
    <span>{message}</span>
  </div>
);

EntityList.propTypes = {
  entities: PropTypes.arrayOf(EntitySummaryPropType).isRequired,
  current: EntitySummaryPropType,
  message: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

EntityList.defaultProps = {
  current: null,
  message: null,
};

const mapStateToProps = state => ({
  entities: state.entity.list,
  current: state.entity.current,
  message: state.entity.message,
});

const mapDispatchToProps = dispatch => ({
  loadEntities: () => dispatch(entityListRequest()),
  onSelect: entityId => () => dispatch(entityLoadRequest(entityId)),
  onCreate: () => dispatch(entityModeChange('NEW')),
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


export default enhance(EntityList);
