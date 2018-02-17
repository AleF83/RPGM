import React from 'react';
import PropTypes from 'prop-types';

const Messages = ({ messages }) => (
  <ul>
    {
      messages.map((msg, id) =>
        <li key={id}>{msg}</li>) // eslint-disable-line react/no-array-index-key
    }
  </ul>
);

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Messages;
