import React from 'react';
import styled from 'react-emotion';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from 'material-ui';
import { Save, Cancel, Delete } from 'material-ui-icons';


import PropTypes from 'prop-types';
import { EntityPropType } from './EntityPropTypes';

import EntityAvatar from './avatar/EntityAvatar';
import editable from './avatar/editable';
import EntityDescriptionEditor from './editor/EntityDescriptionEditor';

const MainElement = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 5px;
`;

const SummaryRow = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 5px;
`;

const SummaryFields = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ButtonRow = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const EditableAvatar = editable(EntityAvatar);

const EntityEditElement = ({
  entity, onChange, onSave, onCancel, onDelete, onAvatarChange, entityTypes,
}) => (
  <MainElement>
    <SummaryRow>
      <EditableAvatar
        entityId={entity.id}
        avatarType={entity.avatarType}
        onAvatarChange={onAvatarChange}
        width={100}
        height={100}
      />
      <SummaryFields>
        <TextField id="txtName" label="Name" name="name" required value={entity.name} onChange={onChange} />
        <TextField id="txtSummary" label="Summary" name="summary" value={entity.summary} onChange={onChange} />
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
      </SummaryFields>
    </SummaryRow>
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
  entityTypes: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onAvatarChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

EntityEditElement.defaultProps = {
  entityTypes: [],
};

export default EntityEditElement;
