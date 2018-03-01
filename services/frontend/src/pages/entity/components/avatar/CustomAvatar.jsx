import React from 'react';
import { withProps } from 'recompose';
import styled from 'react-emotion';

import PropTypes from 'prop-types';

const Image = styled('img')`
`;

const CustomAvatar = ({ imageUrl, width, height }) =>
  (<Image id="imgCustomAvatar" src={imageUrl} width={width} height={height} />);

CustomAvatar.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const enhance = withProps(({ entityId }) => ({
  imageUrl: `${process.env.REACT_APP_BACKEND_URL}/api/images/avatars/${entityId}`,
}));

export default enhance(CustomAvatar);
