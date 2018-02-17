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

const EntityEditElement = ({
  entity, onChange, onSave, onCancel, onDelete,
}) => (
  <MainElement>
    <h4>Entity Edit</h4>
    <input type="text" placeholder="Name" name="name" value={entity.name} onChange={onChange} />
    <input type="text" placeholder="Summary" name="summary" value={entity.summary} onChange={onChange} />
    <input type="text" placeholder="Description" name="description" value={entity.description} onChange={onChange} />
    <ButtonRow>
      <button onClick={onSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onDelete}>Delete</button>
    </ButtonRow>
  </MainElement>
);

EntityEditElement.propTypes = {
  entity: EntityPropType.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EntityEditElement;
