import React from 'react';
import styled from 'react-emotion';

import PropTypes from 'prop-types';

import EntityList from './components/EntityList';
import EntityView from './components/EntityView';
import EntityEdit from './components/EntityEdit';
import Messages from './components/Messages';

const MainElement = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #eeeeee;
`;

const EntityPageElement = ({ mode, messages }) => (
  <MainElement>

    {{
        LIST: (<EntityList />),
        VIEW: (<EntityView />),
        EDIT: (<EntityEdit />),
        NEW: (<EntityEdit />),
      }[mode]}

    <Messages messages={messages} />
  </MainElement>
);

EntityPageElement.propTypes = {
  mode: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EntityPageElement;
