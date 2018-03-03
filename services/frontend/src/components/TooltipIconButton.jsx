import React from 'react';
import { IconButton, Tooltip } from 'material-ui';
import PropTypes from 'prop-types';

const TooltipIconButton = ({
  id, tooltip, onClick, children,
}) => (
  <Tooltip title={tooltip}>
    <IconButton id={id} onClick={onClick} aria-label={tooltip}>
      {children}
    </IconButton>
  </Tooltip>
);

TooltipIconButton.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element,
  tooltip: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

TooltipIconButton.defaultProps = {
  children: [],
};

export default TooltipIconButton;
