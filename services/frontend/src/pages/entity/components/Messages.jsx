import React from 'react';
import { Paper, List, ListItem } from 'material-ui';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

const MainElement = styled(Paper)`
  max-height: 150px;
  overflow: auto;
`;

const Messages = ({ messages }) => (
  <MainElement>
    <List>
      {
      messages.map((msg, id) =>
        <ListItem key={id}>{msg}</ListItem>) // eslint-disable-line react/no-array-index-key
    }
    </List>
  </MainElement>
);

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Messages;
