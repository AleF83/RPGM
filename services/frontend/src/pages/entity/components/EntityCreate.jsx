import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Button, TextField } from 'material-ui';
import { Save, Cancel } from 'material-ui-icons';

import PropTypes from 'prop-types';
import { EntityPropType } from './EntityPropTypes';

import EntityDescriptionEditor from './editor/EntityDescriptionEditor';

import { entityCreateRequest, entityPropertyChange, entityModeChange } from '../state/entityActionCreators';

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

const EntityCreate = ({
  entity, onSave, onCancel, onChange,
}) => (
  <MainElement>
    <span>Create Entity</span>
    <TextField data-id="txtName" name="name" label="Name" value={entity.name} onChange={onChange} />
    <TextField data-id="txtSummary" name="summary" label="Summary" value={entity.summary} onChange={onChange} />
    <EntityDescriptionEditor />
    <ButtonsRow>
      <Button data-id="btnSave" onClick={onSave}>
        <Save />
      </Button>
      <Button onClick={onCancel}>
        <Cancel />
      </Button>
    </ButtonsRow>
  </MainElement>
);

EntityCreate.propTypes = {
  entity: EntityPropType.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  entity: state.entity.current,
});

const mapDispatchToProps = dispatch => ({
  onChange: ({ target }) => dispatch(entityPropertyChange(target.name, target.value)),
  onSave: entity => () => dispatch(entityCreateRequest(entity)),
  onCancel: () => dispatch(entityModeChange('LIST')),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onSave: dispatchProps.onSave(stateProps.entity),
});

const enhance = connect(mapStateToProps, mapDispatchToProps, mergeProps);

export default enhance(EntityCreate);
