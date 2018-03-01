import React from 'react';
import styled, { css } from 'react-emotion';
import { Paper, Button, Typography } from 'material-ui';
import { Delete, Edit } from 'material-ui-icons';

import PropTypes from 'prop-types';
import { EntityPropType } from './EntityPropTypes';

import EntityAvatar from './avatar/EntityAvatar';
import EntityDescriptionEditor from './editor/EntityDescriptionEditor';

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

const ButtonRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const paperStyle = css`
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 12px;
`;

const EntityViewElement = ({
  entity, onEdit, onDelete,
}) => (
  <MainElement>
    <Paper className={paperStyle} elevation={4}>
      <SummaryRow>
        <EntityAvatar
          entityId={entity.id}
          avatarType={entity.avatarType}
          width={100}
          height={100}
        />
        <SummaryFields>
          <Typography id="lblName" variant="title" gutterBottom>{entity.name}</Typography>
          <Typography id="lblSummary" variant="body1" gutterBottom>{entity.summary}</Typography>
          <Typography id="lblType" variant="subheading" gutterBottom>{entity.type}</Typography>
        </SummaryFields>
      </SummaryRow>
      <EntityDescriptionEditor readOnly />
    </Paper>
    <ButtonRow>
      <Button id="btnEdit" onClick={onEdit}>
        <Edit />
      </Button>
      <Button id="btnDelete" onClick={onDelete(entity.id)}>
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
