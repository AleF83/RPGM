import React from 'react';
import { withStateHandlers } from 'recompose';
import { Tabs, Tab, AppBar } from 'material-ui';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import EntityDescriptionEditor from '../editor/EntityDescriptionEditor';


const MainElement = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
`;

const EditTabs = ({ activeTab, onTabChange }) => (
  <MainElement>
    <AppBar position="static" color="default">
      <Tabs
        value={activeTab}
        onChange={onTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Description" />
        <Tab label="Connected entities" />
      </Tabs>
    </AppBar>
    {activeTab === 0 && <EntityDescriptionEditor />}
  </MainElement>
);

EditTabs.propTypes = {
  activeTab: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

const enhance = withStateHandlers(
  ({ activeTab = 0 }) => ({
    activeTab,
  }),
  {
    onTabChange: () => (event, index) => ({ activeTab: index }),
  },
);

export default enhance(EditTabs);
