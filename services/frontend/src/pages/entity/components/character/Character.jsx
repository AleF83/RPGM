import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import { entityPropertyChanged, entitySavedRequest } from '../../state/entityActionCreators';

const MainElement = styled('div')`
  flex: 1;
`;

const Name = styled('input')`
  display: block;
`;

const Save = styled('input')`
  display: block;
`;

const Message = styled('span')`
`;

const Character = ({
  name,
  message,
  onChange,
  onSave,
}) => (
  <MainElement>
    Character Sheet
    <Name type="text" placeholder="Name..." value={name} onChange={onChange('name')} />
    <Save type="button" value="Save" data-id="btnSave" onClick={onSave} />
    <Message data-id="message">{message}</Message>
  </MainElement>
);

Character.propTypes = {
  name: PropTypes.string,
  message: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

Character.defaultProps = {
  name: 'Unnamed Hero',
  message: 'Not saved',
};

const mapStateToProps = state => ({
  name: state.entity.name,
  message: state.entity.message,
});

const mapDispatchToProps = dispatch => ({
  onChange:
    propName =>
      e => dispatch(entityPropertyChanged(propName, e.target.value)),
  onSave:
    () => dispatch(entitySavedRequest()),
});

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(Character);
