import React from 'react';
import styled from 'react-emotion';
import { IconButton } from 'material-ui';
import { Edit } from 'material-ui-icons';

import PropTypes from 'prop-types';
import { DeleteButton } from '../../../../components/ActionButtons';

const Wrapper = styled.div`
  position: relative;
  min-height: 100px;
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

        <DeleteButton onClick={props.onAvatarDelete} />
      </ButtonsDiv>
    </Wrapper>);

  wrapper.propTypes = {
    onAvatarChange: PropTypes.func.isRequired,
    onAvatarDelete: PropTypes.func.isRequired,
  };

  return wrapper;
};

editable.propTypes = {
  Component: PropTypes.element.isRequired,
};

export default editable;
