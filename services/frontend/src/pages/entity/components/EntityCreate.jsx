import React from 'react';
import { connect } from 'react-redux';
import { compose, withStateHandlers } from 'recompose';
import styled from 'react-emotion';

import PropTypes from 'prop-types';
import { entityCreateRequest } from '../state/entityActionCreators';

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
  name, summary, description, save, onChange,
}) => (
  <MainElement>
    <span>Create Entity</span>
    <input type="text" id="name" name="name" placeholder="Name" value={name} onChange={onChange} />
    <input type="text" id="summary" name="summary" placeholder="Summary" value={summary} onChange={onChange} />
    <input type="text" id="description" name="description" placeholder="Description" value={description} onChange={onChange} />
    <ButtonsRow>
      <button onClick={save({ name, summary, description })}>Save</button>
      <button onClick={() => {}}>Cancel</button>
    </ButtonsRow>
  </MainElement>
);

EntityCreate.propTypes = {
  name: PropTypes.string,
  summary: PropTypes.string,
  description: PropTypes.string,
  save: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

EntityCreate.defaultProps = {
  name: '',
  summary: '',
  description: '',
};

const mapDispatchToProps = dispatch => ({
  save: entityCreationParams => () => dispatch(entityCreateRequest(entityCreationParams)),
});

const enhance = compose(
  connect(null, mapDispatchToProps),
  withStateHandlers(() => ({
    name: '',
    summary: '',
    description: '',
  }), {
    onChange: () => ({ target: { name, value } }) => ({ [name]: value }),
  }),
);

export default enhance(EntityCreate);
