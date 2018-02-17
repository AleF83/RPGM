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

const ButtonRow = styled('div')`
  display: flex;
  flex: 1;
  flex-direaction: row;
`;


const EntityList = ({
  entities, onSelect, onDelete, onCreate, onRefresh,
}) => (
  <div>
    <List>
      {
        entities.map(entity =>
          (<EntityListItem
            key={entity.id}
            entity={entity}
            isSelected={false}
            onSelect={onSelect}
            onDelete={onDelete}
          />))
      }
    </List>
    <ButtonRow>
      <button onClick={onCreate} data-id="btnNew">New Entity</button>
      <button onClick={onRefresh}>Refresh</button>
    </ButtonRow>
  </div>
);

EntityList.propTypes = {
  entities: PropTypes.arrayOf(EntitySummaryPropType).isRequired,
  onSelect: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  entities: state.entity.list,
});

const mapDispatchToProps = dispatch => ({
  loadEntities: () => dispatch(entityListRequest()),
  onSelect: entityId => () => dispatch(entityLoadRequest(entityId)),
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


export default enhance(EntityList);
