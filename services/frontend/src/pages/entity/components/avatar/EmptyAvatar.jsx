import React from 'react';
import styled from 'react-emotion';

import PropTypes from 'prop-types';

const EmptyImage = styled('div')`
  display: inline;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const EmptyAvatar = ({ width, height }) =>
  (<EmptyImage width={width} height={height}>No Avatar</EmptyImage>);

EmptyAvatar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default EmptyAvatar;
