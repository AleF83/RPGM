import React from 'react';
import { connect } from 'react-redux';
import Editor from 'draft-js-plugins-editor';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { entityPropertyChange } from '../../state/entityActionCreators';
import toolbarPlugin from './configureToolbarPlugin';
import './Editor.css';

const { Toolbar } = toolbarPlugin;

const MainElement = styled.div`
  position: relative;
  display: flex;
  flex: 1;

  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  box-shadow: inset 0px 1px 8px -3px #ABABAB;
  background: #fefefe;
`;

const toolbarStyle = css`
  display: flex;
  position: absolute;
  bottom: 0px;
  background: red;
`;

const EntityDescriptionEditor = ({ editorState, onStateChange, readOnly }) => (
  <MainElement>
    <Editor
      editorState={editorState}
      onChange={onStateChange}
      plugins={[toolbarPlugin]}
      readOnly={readOnly}
    />
    { readOnly ? null : <div className={toolbarStyle}><Toolbar /></div>}
  </MainElement>
);

EntityDescriptionEditor.propTypes = {
  editorState: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onStateChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

EntityDescriptionEditor.defaultProps = {
  readOnly: false,
};

const mapStateToProps = state => ({
  editorState: state.entity.current.description,
});

const mapDispatchToProps = dispatch => ({
  onStateChange: editorState => dispatch(entityPropertyChange('description', editorState)),
});

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(EntityDescriptionEditor);
