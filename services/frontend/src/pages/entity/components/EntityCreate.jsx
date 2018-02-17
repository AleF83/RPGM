import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import PropTypes from 'prop-types';
import { EntityPropType } from './EntityPropTypes';

import { entityCreateRequest, entityUpdateReset, entityPropertyChange } from '../state/entityActionCreators';

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
    <input type="text" id="name" name="name" placeholder="Name" value={entity.name} onChange={onChange} />
    <input type="text" id="summary" name="summary" placeholder="Summary" value={entity.summary} onChange={onChange} />
    <input type="text" id="description" name="description" placeholder="Description" value={entity.description} onChange={onChange} />
    <ButtonsRow>
      <button onClick={onSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
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
  onCancel: () => dispatch(entityUpdateReset()),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onSave: dispatchProps.onSave(stateProps.entity),
});

const enhance = connect(mapStateToProps, mapDispatchToProps, mergeProps);

export default enhance(EntityCreate);
