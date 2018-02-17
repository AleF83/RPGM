import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Button } from 'material-ui';
import { Edit, Delete } from 'material-ui-icons';

const MainElement = styled('li')`
  margin-top: 5px;
`;

const Row = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: row;
  background-color: ${({ isSelected }) => (isSelected ? 'LightGray' : 'FloralWhite')}
`;

const LeftSide = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const EntityName = styled('span')`
  font-size: 20px;
  font-family: fantasy;
`;

const EntitySummary = styled('span')`
  font-size: 10px;
`;

const EntityListItem = ({
  entity, isSelected, onSelect, onEdit, onDelete,
}) => (
  <MainElement>
    <Row isSelected={isSelected}>
      <LeftSide role="presentation" onClick={onSelect(entity.id)}>
        <EntityName>{entity.name}</EntityName>
        <EntitySummary>{entity.summary}</EntitySummary>
      </LeftSide>
      <Button onClick={onEdit(entity.id)}>
        <Edit />
      </Button>
      <Button onClick={onDelete(entity.id)}>
        <Delete />
      </Button>
    </Row>
  </MainElement>
);

EntityListItem.propTypes = {
  entity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    summary: PropTypes.string,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EntityListItem;
