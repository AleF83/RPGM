import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import styled from 'react-emotion';

import PropTypes from 'prop-types';

const Image = styled.img`
`;

const CustomAvatar = ({ imageUrl, width, height }) =>
  (<Image id="imgCustomAvatar" src={imageUrl} width={width} height={height} />);

CustomAvatar.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  idToken: state.auth.idToken,
});

const enhance = compose(
  connect(mapStateToProps),
  withProps(({ entityId, idToken }) => ({
    imageUrl: `${process.env.REACT_APP_BACKEND_URL}/api/images/avatars/${entityId}?access_token=${idToken}`,
  })),
);

export default enhance(CustomAvatar);
