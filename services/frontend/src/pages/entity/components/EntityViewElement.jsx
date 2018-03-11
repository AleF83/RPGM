import React from 'react';
import styled, { css } from 'react-emotion';
import { AppBar, Toolbar, Paper, Typography } from 'material-ui';

import PropTypes from 'prop-types';
import { EntityPropType } from './EntityPropTypes';

import { BackButton, EditButton, DeleteButton } from '../../../components/ActionButtons';
import EntityAvatar from './avatar/EntityAvatar';
import Progress from './Progress';

const MainElement = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 5px;
`;

const SummaryRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 5px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SummaryFields = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const paperStyle = css`
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 12px;
`;

const EntityViewElement = ({
  entity, onBack, onEdit, onDelete,
}) => (
  <MainElement>
    <AppBar position="static" color="default">
      <Toolbar>
        <BackButton onClick={onBack} />
        <EditButton onClick={onEdit} />
        <DeleteButton onClick={onDelete(entity.id)} />

      </Toolbar>
    </AppBar>
    <Progress />
    <Paper className={paperStyle} elevation={4}>
      <SummaryRow>
        <EntityAvatar
          entityId={entity.id}
          avatarType={entity.avatarType}
          width={200}
          height={200}
        />
        <SummaryFields>
          <Typography id="lblName" variant="title" gutterBottom>{entity.name}</Typography>
          <Typography id="lblSummary" variant="body1" gutterBottom>{entity.summary}</Typography>
          <Typography id="lblType" variant="subheading" gutterBottom>{entity.type}</Typography>
        </SummaryFields>
      </SummaryRow>
    </Paper>
  </MainElement>
);

EntityViewElement.propTypes = {
  entity: EntityPropType.isRequired,
  onBack: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EntityViewElement;
