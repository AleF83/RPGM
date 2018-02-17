import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'react-emotion';

import PropTypes from 'prop-types';

import EntityList from './components/EntityList';
import EntityView from './components/EntityView';
import EntityEdit from './components/EntityEdit';
import EntityCreate from './components/EntityCreate';
import Messages from './components/Messages';

const MainElement = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const EntitiesPane = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

const EntityListStyle = css({
  flex: 1,
});

const EntityStyle = css`
  flex: 2;
`;

const EntityPage = ({ mode, messages }) => (
  <MainElement>
    <span>This is Entity Page</span>
    <EntitiesPane>
      <EntityList className={EntityListStyle} />
      {{
        VIEW: (<EntityView className={EntityStyle} />),
        EDIT: (<EntityEdit className={EntityStyle} />),
        NEW: (<EntityCreate className={EntityStyle} />),
      }[mode]}
    </EntitiesPane>
    <Messages messages={messages} />
  </MainElement>
);

EntityPage.propTypes = {
  mode: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  mode: state.entity.mode,
  messages: state.entity.messages,
});

const enhance = connect(mapStateToProps);

export default enhance(EntityPage);
