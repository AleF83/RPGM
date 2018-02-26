import React from 'react';
import styled from 'react-emotion';

import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Toolbar,
  IconButton,
} from 'material-ui';
import { Edit, Delete, AccountCircle } from 'material-ui-icons';

import PropTypes from 'prop-types';
import { EntitySummaryPropType } from './EntityPropTypes';

import { getAvatar } from '../entityUtils';

const CustomAvatar = styled('img')`

`;

const EntityListItem = ({
  entity, onSelect, onEdit, onDelete,
}) => (
  <ListItem button>
    <ListItemAvatar>
      <Avatar>
        {
          entity.hasAvatar
          ?
            <CustomAvatar src={getAvatar(entity.id)} alt="avatar" width={40} height={40} />
          :
            <AccountCircle />
        }
      </Avatar>
    </ListItemAvatar>
    <ListItemText id={`lstItem-${entity.name}`} primary={entity.name} secondary={entity.summary} onClick={onSelect(entity.id)} />
    <ListItemSecondaryAction>
      <Toolbar>
        <IconButton onClick={onEdit(entity.id)}>
          <Edit />
        </IconButton>
        <IconButton onClick={onDelete(entity.id)}>
          <Delete />
        </IconButton>
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
