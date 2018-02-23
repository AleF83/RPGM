import React from 'react';

import styled from 'react-emotion';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from 'material-ui';
import { Save, Cancel } from 'material-ui-icons';

import PropTypes from 'prop-types';
import { EntityPropType } from './EntityPropTypes';

import EntityDescriptionEditor from './editor/EntityDescriptionEditor';

const MainElement = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ButtonsRow = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const EntityCreateElement = ({
  entity, onSave, onCancel, onChange, entityTypes,
}) => (
  <MainElement>
    <span>Create Entity</span>
    <TextField id="txtName" name="name" label="Name" required value={entity.name} onChange={onChange} />
    <TextField id="txtSummary" name="summary" label="Summary" value={entity.summary} onChange={onChange} />
    <FormControl>
      <InputLabel htmlFor="slctType">Type</InputLabel>
      <Select
        value={entity.type}
        onChange={onChange}
        inputProps={{
       id: 'slctType', name: 'type',
    }}>
        {
          entityTypes.map(opt =>
            (<MenuItem key={opt} value={opt}>{opt}</MenuItem>))
        }
      </Select>
    </FormControl>
    <EntityDescriptionEditor />
    <ButtonsRow>
      <Button id="btnSave" onClick={onSave}>
        <Save />
      </Button>
      <Button onClick={onCancel}>
        <Cancel />
      </Button>
    </ButtonsRow>
  </MainElement>
);

EntityCreateElement.propTypes = {
  entity: EntityPropType.isRequired,
  entityTypes: PropTypes.arrayOf(PropTypes.string),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

EntityCreateElement.defaultProps = {
  entityTypes: [],
};

export default EntityCreateElement;
