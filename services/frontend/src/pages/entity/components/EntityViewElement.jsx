import React from 'react';
import styled from 'react-emotion';
import { Button } from 'material-ui';
import { Delete, Edit } from 'material-ui-icons';

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

const EntityViewElement = ({
  entity, onEdit, onDelete,
}) => (
  <MainElement>
    Entity View<br />
    Name: {entity.name} <br />
    Summary: {entity.summary} <br />
    <EntityDescriptionEditor readOnly />
    <ButtonRow>
      <Button onClick={onEdit}>
        <Edit />
      </Button>
      <Button onClick={onDelete(entity.id)}>
        <Delete />
      </Button>
    </ButtonRow>
  </MainElement>
);

EntityViewElement.propTypes = {
  entity: EntityPropType.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EntityViewElement;
