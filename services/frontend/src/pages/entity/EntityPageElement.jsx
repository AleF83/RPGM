import React from 'react';
import styled from 'react-emotion';

import PropTypes from 'prop-types';

import EntityList from './components/EntityList';
import EntityView from './components/EntityView';
import EntityEdit from './components/EntityEdit';

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

const EntityPageElement = ({ mode }) => (
  <MainElement>
    {{
        LIST: (<EntityList />),
        VIEW: (<EntityView />),
        EDIT: (<EntityEdit />),
        NEW: (<EntityEdit />),
      }[mode]}
  </MainElement>
);

EntityPageElement.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default EntityPageElement;
