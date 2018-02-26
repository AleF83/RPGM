import React from 'react';
import styled from 'react-emotion';
import { Button, IconButton, TextField, Select, MenuItem, FormControl, InputLabel } from 'material-ui';
import { Save, Edit, Cancel, Delete } from 'material-ui-icons';


import PropTypes from 'prop-types';
import { EntityPropType } from './EntityPropTypes';

import EntityDescriptionEditor from './editor/EntityDescriptionEditor';
import { getAvatar } from '../entityUtils';

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

const EntityAvatarDiv = styled('div')`

`;

const EntityAvatar = styled('img')`
`;

const AvatarButton = styled('label')`
  position: relative;
  bottom: 15px;
  right: 40px;
  z-index: 99;
`;

const ButtonRow = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const HidenInput = styled('input')`
  display: none;
`;


const EntityEditElement = ({
  entity, onChange, onSave, onCancel, onDelete, onAvatarChange, entityTypes,
}) => (
  <MainElement>
    <SummaryRow>
      <EntityAvatarDiv>
        <EntityAvatar src={getAvatar(entity.id)} width={100} height={100} />
        <HidenInput
          name="avatar"
          accept="image/*"
          id="raised-button-file"
          type="file"
          onChange={onAvatarChange}
        />
        <AvatarButton htmlFor="raised-button-file">
          <IconButton component="span">
            <Edit />
          </IconButton>
        </AvatarButton>
      </EntityAvatarDiv>
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
