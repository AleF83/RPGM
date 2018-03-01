import React from 'react';
import { AccountCircle } from 'material-ui-icons';

import PropTypes from 'prop-types';

const EntityTypeAvatar = ({ width, height }) => (
  <AccountCircle width={width} height={height} />
);

EntityTypeAvatar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default EntityTypeAvatar;
