import React from 'react';
import styled from 'react-emotion';
import { IconButton } from 'material-ui';
import { Edit, Delete } from 'material-ui-icons';

import PropTypes from 'prop-types';

const Wrapper = styled.div`
  position: relative;
`;

const ButtonsDiv = styled.div`
  position: absolute;
  bottom: 0px;
  z-index: 2;
  min-width: 150px;
`;

const EditButton = styled.label`
`;

const HidenInput = styled.input`
  display: none;
`;

const editable = (Component) => {
  const wrapper = props => (
    <Wrapper>
      <Component {...props} />
      <ButtonsDiv>
        <HidenInput
          name="avatar"
          accept="image/*"
          id="raised-button-file"
          type="file"
          onChange={props.onAvatarChange}
        />
        <EditButton htmlFor="raised-button-file">
          <IconButton id="btnEditAvatar" component="span">
            <Edit />
          </IconButton>
        </EditButton>

        <IconButton>
          <Delete />
        </IconButton>
      </ButtonsDiv>
    </Wrapper>);

  wrapper.propTypes = {
    onAvatarChange: PropTypes.func.isRequired,
  };

  return wrapper;
};

editable.propTypes = {
  Component: PropTypes.element.isRequired,
};

export default editable;
