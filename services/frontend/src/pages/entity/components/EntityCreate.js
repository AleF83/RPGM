import { connect } from 'react-redux';

import EntityCreateElement from './EntityCreateElement';

import {
  entityCreateRequest,
  entityPropertyChange,
  entityModeChange,
} from '../state/entityActionCreators';

const mapStateToProps = state => ({
  entity: state.entity.current,
  entityTypes: state.metadata.entityTypes,
});

const mapDispatchToProps = dispatch => ({
  onChange: ({ target }) => dispatch(entityPropertyChange(target.name, target.value)),
  onSave: entity => () => dispatch(entityCreateRequest(entity)),
  onCancel: () => dispatch(entityModeChange('LIST')),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onSave: dispatchProps.onSave(stateProps.entity),
});

const enhance = connect(mapStateToProps, mapDispatchToProps, mergeProps);

export default enhance(EntityCreateElement);
