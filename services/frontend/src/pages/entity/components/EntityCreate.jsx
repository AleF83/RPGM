import React from 'react';
import { connect } from 'react-redux';
import { compose, withStateHandlers } from 'recompose';

import PropTypes from 'prop-types';
import { entityCreateRequest } from '../state/entityActionCreators';

const EntityCreate = ({
  name, summary, description, message, save, onChange,
}) => (
  <div style={{ flex: 1, flexDirection: 'column' }}>
    <span>Create Entity</span>
    <input type="text" id="name" name="name" placeholder="Name" value={name} onChange={onChange} />
    <input type="text" id="summary" name="summary" placeholder="Summary" value={summary} onChange={onChange} />
    <input type="text" id="description" name="description" placeholder="Description" value={description} onChange={onChange} />
    <button onClick={save({ name, summary, description })}>Save</button>
    <span>{message}</span>
  </div>
);

EntityCreate.propTypes = {
  name: PropTypes.string,
  summary: PropTypes.string,
  description: PropTypes.string,
  message: PropTypes.string,
  save: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

EntityCreate.defaultProps = {
  name: '',
  summary: '',
  description: '',
  message: null,
};

const mapStateToProps = state => ({
  message: state.entity.message,
});

const mapDispatchToProps = dispatch => ({
  save: entityCreationParams => () => dispatch(entityCreateRequest(entityCreationParams)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(() => ({
    name: '',
    summary: '',
    description: '',
  }), {
    onChange: () => ({ target: { name, value } }) => ({ [name]: value }),
  }),
);

export default enhance(EntityCreate);
