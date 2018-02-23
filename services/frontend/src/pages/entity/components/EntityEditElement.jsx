import React from 'react';
import styled from 'react-emotion';
import { Button, TextField } from 'material-ui';
import { Save, Cancel, Delete } from 'material-ui-icons';


import PropTypes from 'prop-types';
import { EntityPropType } from './EntityPropTypes';

import EntityDescriptionEditor from './editor/EntityDescriptionEditor';

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
    <TextField id="txtName" label="Name" name="name" required value={entity.name} onChange={onChange} />
    <TextField id="txtSummary" label="Summary" name="summary" value={entity.summary} onChange={onChange} />
    <EntityDescriptionEditor />
    <ButtonRow>
      <Button id="btnSave" onClick={onSave}>
        <Save />
      </Button>
      <Button onClick={onCancel}>
        <Cancel />
      </Button>
      <Button onClick={onDelete}>
        <Delete />
      </Button>
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
