import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import { LinearProgress } from 'material-ui';

const Progress = () => (
  <LinearProgress />
);


const mapStateToProps = state => ({
  inProgress: state.entity.inProgress,
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ inProgress }) => !inProgress, renderNothing),
);

export default enhance(Progress);
