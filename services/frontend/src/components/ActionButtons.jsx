import React from 'react';
import { Save, Add, Edit, Delete, ArrowBack, Refresh, Cancel } from 'material-ui-icons';
import PropTypes from 'prop-types';

import TooltipIconButton from './TooltipIconButton';

export const SaveButton = props => (
  <TooltipIconButton {...props}>
    <Save />
  </TooltipIconButton>
);

SaveButton.propTypes = {
  id: PropTypes.string,
  tooltip: PropTypes.string,
};

SaveButton.defaultProps = {
  id: 'btnSave',
  tooltip: 'Save',
};

export const AddButton = props => (
  <TooltipIconButton {...props}>
    <Add />
  </TooltipIconButton>
);

AddButton.propTypes = {
  id: PropTypes.string,
  tooltip: PropTypes.string,
};

AddButton.defaultProps = {
  id: 'btnAdd',
  tooltip: 'Add',
};

export const EditButton = props => (
  <TooltipIconButton {...props}>
    <Edit />
  </TooltipIconButton>
);

EditButton.propTypes = {
  id: PropTypes.string,
  tooltip: PropTypes.string,
};

EditButton.defaultProps = {
  id: 'btnEdit',
  tooltip: 'Edit',
};

export const DeleteButton = props => (
  <TooltipIconButton {...props}>
    <Delete />
  </TooltipIconButton>
);

DeleteButton.propTypes = {
  id: PropTypes.string,
  tooltip: PropTypes.string,
};

DeleteButton.defaultProps = {
  id: 'btnDelete',
  tooltip: 'Delete',
};

export const BackButton = props => (
  <TooltipIconButton {...props}>
    <ArrowBack />
  </TooltipIconButton>
);

BackButton.propTypes = {
  id: PropTypes.string,
  tooltip: PropTypes.string,
};

BackButton.defaultProps = {
  id: 'btnBack',
  tooltip: 'Back',
};

export const RefreshButton = props => (
  <TooltipIconButton {...props}>
    <Refresh />
  </TooltipIconButton>
);

RefreshButton.propTypes = {
  id: PropTypes.string,
  tooltip: PropTypes.string,
};

RefreshButton.defaultProps = {
  id: 'btnRefresh',
  tooltip: 'Refresh',
};

export const CancelButton = props => (
  <TooltipIconButton {...props}>
    <Cancel />
  </TooltipIconButton>
);

CancelButton.propTypes = {
  id: PropTypes.string,
  tooltip: PropTypes.string,
};

CancelButton.defaultProps = {
  id: 'btnCancel',
  tooltip: 'Cancel',
};
