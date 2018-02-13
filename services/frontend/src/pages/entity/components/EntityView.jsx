import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import PropTypes from 'prop-types';

const EmptyEntityView = () => (
  <span>Nothing to show</span>
);

const EntityView = ({ entity }) => (
  <div>
    Entity View<br />
    Name: {entity.name} <br />
    Summary: {entity.summary} <br />
    Description: {entity.description}
  </div>
);

EntityView.propTypes = {
  entity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    summary: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  entity: state.entity.current,
});

const enhance = Component => compose(
  connect(mapStateToProps),
  branch(
    ({ entity }) => entity,
    renderComponent(Component),
    renderComponent(EmptyEntityView),
  ),
)(Component);

export default enhance(EntityView);
