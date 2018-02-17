import React from 'react';
import styled from 'react-emotion';

import PropTypes from 'prop-types';
import { EntityPropType } from './EntityPropTypes';

const MainElement = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 5px;
`;

const ButtonRow = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const EntityViewElement = ({
  entity, onEdit, onDelete,
}) => (
  <MainElement>
    Entity View<br />
    Name: {entity.name} <br />
    Summary: {entity.summary} <br />
    Description: {entity.description}
    <ButtonRow>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete(entity.id)}>Delete</button>
    </ButtonRow>
  </MainElement>
);

EntityViewElement.propTypes = {
  entity: EntityPropType.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EntityViewElement;
