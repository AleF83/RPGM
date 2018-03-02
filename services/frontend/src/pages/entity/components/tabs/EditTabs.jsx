import React from 'react';
import { withStateHandlers } from 'recompose';
import { Tabs, Tab, AppBar } from 'material-ui';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import EntityDescriptionEditor from '../editor/EntityDescriptionEditor';


const MainElement = styled.div`
  display: flex;
  flex: 1;
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
    onTabChange: () => index => ({ activeTab: index }),
  },
);

export default enhance(EditTabs);
