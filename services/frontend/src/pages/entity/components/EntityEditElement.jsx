import React from 'react';
import styled from 'react-emotion';
import { IconButton, TextField, Select, MenuItem, FormControl, InputLabel, Toolbar, AppBar } from 'material-ui';
import { Save, Cancel, Delete, ArrowBack } from 'material-ui-icons';


import PropTypes from 'prop-types';
import { EntityPropType } from './EntityPropTypes';

import EntityAvatar from './avatar/EntityAvatar';
import editable from './avatar/editable';
import EditTabs from './tabs/EditTabs';

const MainElement = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 5px;
`;

const SummaryRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 5px;
`;

const SummaryFields = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const EditableAvatar = editable(EntityAvatar);

const EntityEditElement = ({
  entity, mode, onChange, onBack, onSave, onCancel, onDelete, onAvatarChange, entityTypes,
}) => (
  <MainElement>
    <AppBar position="static" color="default">
      <Toolbar>
        <IconButton id="btnBackToList" onClick={onBack}>
          <ArrowBack />
        </IconButton>
        <IconButton id="btnSave" onClick={onSave}>
          <Save />
        </IconButton>
        <IconButton id="btnCancel" onClick={onCancel}>
          <Cancel />
        </IconButton>
        <IconButton id="btnDelete" onClick={onDelete}>
          <Delete />
        </IconButton>
      </Toolbar>
    </AppBar>
    <SummaryRow>
      { mode === 'NEW'
      ?
        <EntityAvatar
          entityId={entity.id}
          avatarType={entity.avatarType}
          onAvatarChange={onAvatarChange}
          width={200}
          height={200}
        />
      :
        <EditableAvatar
          entityId={entity.id}
          avatarType={entity.avatarType}
          onAvatarChange={onAvatarChange}
          width={200}
          height={200}
        />
      }
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
    <EditTabs />
  </MainElement>
);

EntityEditElement.propTypes = {
  entity: EntityPropType.isRequired,
  mode: PropTypes.string.isRequired,
  entityTypes: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onAvatarChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

EntityEditElement.defaultProps = {
  entityTypes: [],
};

export default EntityEditElement;
