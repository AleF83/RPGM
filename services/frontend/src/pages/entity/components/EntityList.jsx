import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import PropTypes from 'prop-types';

import EntityListItem from './EntityListItem';
import { entityListRequest, entityLoadRequest, entityDeleteRequest } from '../state/entityActionCreators';

const EntityList = ({
  entities, current, selectEntity, deleteEntity,
}) => (
  <div>
    <button>Load</button>
    <table>
      <tbody>
        {
          entities.map(entity =>
            (<EntityListItem
              key={entity.id}
              entity={entity}
              isSelected={entity.id === current.id}
              selectEntity={selectEntity}
              deleteEntity={deleteEntity}
            />))
        }
      </tbody>
    </table>
  </div>
);

EntityList.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    summary: PropTypes.string,
  }).isRequired).isRequired,
  current: PropTypes.shape({
    name: PropTypes.string.isRequired,
    summary: PropTypes.string,
  }),
  selectEntity: PropTypes.func.isRequired,
  deleteEntity: PropTypes.func.isRequired,
};

EntityList.defaultProps = {
  current: null,
};

const mapStateToProps = state => ({
  entities: state.entity.list,
  current: state.entity.current,
});

const mapDispatchToProps = dispatch => ({
  loadEntities: () => dispatch(entityListRequest()),
  selectEntity: entityId => () => dispatch(entityLoadRequest(entityId)),
  deleteEntity: entityId => () => dispatch(entityDeleteRequest(entityId)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.loadEntities();
    },
  }),
);


export default enhance(EntityList);
