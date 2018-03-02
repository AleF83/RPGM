import React from 'react';
import styled from 'react-emotion';
import { AppBar, Toolbar, IconButton, List } from 'material-ui';
import { Add, Refresh } from 'material-ui-icons';

import PropTypes from 'prop-types';
import { EntitySummaryPropType } from './EntityPropTypes';

import EntityListItem from './EntityListItem';

const MainElement = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;


const EntityListElement = ({
  entities, onSelect, onEdit, onDelete, onCreate, onRefresh,
}) => (
  <MainElement>
    <AppBar position="static" color="default">
      <Toolbar>
        <IconButton onClick={onCreate} id="btnNew">
          <Add />
        </IconButton>
        <IconButton onClick={onRefresh}>
          <Refresh />
        </IconButton>
      </Toolbar>
    </AppBar>
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
  </MainElement>
);

EntityListElement.propTypes = {
  entities: PropTypes.arrayOf(EntitySummaryPropType).isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default EntityListElement;
