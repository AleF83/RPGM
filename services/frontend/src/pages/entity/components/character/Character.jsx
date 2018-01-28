import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import { entityPropertyChanged } from '../../state/entityActionCreators';

const MainElement = styled('div')`
  flex: 1;
`;

const Name = styled('input')`
  display: block;
`;

const Character = ({ name, onChange }) => (
  <MainElement>
    Character Sheet
    <Name type="text" placeholder="Name..." value={name} onChange={onChange('name')} />
  </MainElement>
);

Character.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Character.defaultProps = {
  name: 'Unnamed Hero',
};

const mapStateToProps = state => ({
  name: state.entity.name,
});

const mapDispatchToProps = dispatch => ({
  onChange:
    propName =>
      e => dispatch(entityPropertyChanged(propName, e.target.value)),
});

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(Character);
