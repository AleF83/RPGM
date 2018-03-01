import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import styled from 'react-emotion';
import { Button, List } from 'material-ui';
import { Add, Refresh } from 'material-ui-icons';

import PropTypes from 'prop-types';
import { EntitySummaryPropType } from './EntityPropTypes';

import EntityListItem from './EntityListItem';
import { entityListRequest, entityLoadRequest, entityDeleteRequest, entityModeChange } from '../state/entityActionCreators';

const MainElement = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ButtonRow = styled.div`
  display: flex;
  flex: 1;
  flex-direaction: row;
`;


const EntityList = ({
  entities, onSelect, onEdit, onDelete, onCreate, onRefresh,
}) => (
  <MainElement>
    <List>
      {
        entities.map(entity =>
          (<EntityListItem
            key={entity.id}
            entity={entity}
            isSelected={false}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
          />))
      }
    </List>
    <ButtonRow>
      <Button onClick={onCreate} id="btnNew">
        <Add />
      </Button>
      <Button onClick={onRefresh}>
        <Refresh />
      </Button>
    </ButtonRow>
  </MainElement>
);

EntityList.propTypes = {
  entities: PropTypes.arrayOf(EntitySummaryPropType).isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
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


export default enhance(EntityList);
