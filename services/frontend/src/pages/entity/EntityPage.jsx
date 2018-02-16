import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import EntityList from './components/EntityList';
import EntityView from './components/EntityView';
import EntityEdit from './components/EntityEdit';
import EntityCreate from './components/EntityCreate';

const EntityPage = ({ mode }) => (
  <div style={{ flex: 1, flexDirection: 'column' }}>
    <span>This is Entity Page</span>
    <EntityList />
    {{
      VIEW: (<EntityView />),
      EDIT: (<EntityEdit />),
      NEW: (<EntityCreate />),
    }[mode]}
  </div>
);

EntityPage.propTypes = {
  mode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  mode: state.entity.mode,
});

const enhance = connect(mapStateToProps);

export default enhance(EntityPage);
