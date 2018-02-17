import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import styled from 'react-emotion';

import PropTypes from 'prop-types';
import { EntitySummaryPropType } from './EntityPropTypes';

import EntityListItem from './EntityListItem';
import { entityListRequest, entityLoadRequest, entityDeleteRequest, entityModeChange } from '../state/entityActionCreators';

const List = styled('ul')`
  list-style: none;
`;


const EntityList = ({
  entities, current, onSelect, onDelete, onCreate,
}) => (
  <div>
    <List>
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
    </List>
    <button onClick={onCreate}>New Entity</button>
  </div>
);

EntityList.propTypes = {
  entities: PropTypes.arrayOf(EntitySummaryPropType).isRequired,
  current: EntitySummaryPropType,
  onSelect: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

EntityList.defaultProps = {
  current: null,
};

const mapStateToProps = state => ({
  entities: state.entity.list,
  current: state.entity.current,
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
