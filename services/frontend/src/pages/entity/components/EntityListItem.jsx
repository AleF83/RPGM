import React from 'react';

import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Toolbar,
} from 'material-ui';

import PropTypes from 'prop-types';
import { EntitySummaryPropType } from './EntityPropTypes';

import { EditButton, DeleteButton } from '../../../components/ActionButtons';
import EntityAvatar from './avatar/EntityAvatar';

const EntityListItem = ({
  entity, onSelect, onEdit, onDelete,
}) => (
  <ListItem button>
    <ListItemAvatar>
      <Avatar>
        <EntityAvatar entityId={entity.id} avatarType={entity.avatarType} width={40} height={40} />
      </Avatar>
    </ListItemAvatar>
    <ListItemText id={`lstItem-${entity.name}`} primary={entity.name} secondary={entity.summary} onClick={onSelect(entity.id)} />
    <ListItemSecondaryAction>
      <Toolbar>
        <EditButton onClick={onEdit(entity.id)} />
        <DeleteButton onClick={onDelete(entity.id)} />
      </Toolbar>
    </ListItemSecondaryAction>
  </ListItem>
);

EntityListItem.propTypes = {
  entity: EntitySummaryPropType.isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EntityListItem;
