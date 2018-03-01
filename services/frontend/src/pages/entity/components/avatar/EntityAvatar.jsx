import React from 'react';
import EmptyAvatar from './EmptyAvatar';
import CustomAvatar from './CustomAvatar';
import EntityTypeAvatar from './EntityTypeAvatar';

const EntityAvatar = ({
  entityId, avatarType, width, height,
}) => (

  {
    none: (<EmptyAvatar width={width} height={height} />),
    entityType: (<EntityTypeAvatar width={width} height={height} />),
    custom: (<CustomAvatar entityId={entityId} width={width} height={height} />),
  }[avatarType] || null

);

export default EntityAvatar;
