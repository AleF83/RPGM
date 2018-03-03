import React from 'react';
import styled from 'react-emotion';
import { AppBar, Toolbar, List } from 'material-ui';

import PropTypes from 'prop-types';
import { EntitySummaryPropType } from './EntityPropTypes';

import EntityListItem from './EntityListItem';
import { RefreshButton, AddButton } from '../../../components/ActionButtons';

const MainElement = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
`;

const StyledList = styled(List)`
  margin: 5px;
`;


const EntityListElement = ({
  entities, onSelect, onEdit, onDelete, onCreate, onRefresh,
}) => (
  <MainElement>
    <AppBar position="static" color="default">
      <Toolbar>
        <AddButton onClick={onCreate} />
        <RefreshButton onClick={onRefresh} />
      </Toolbar>
    </AppBar>
    <StyledList>
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
    </StyledList>
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
