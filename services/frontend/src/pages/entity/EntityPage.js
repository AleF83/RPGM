import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { metadataRequest } from './state/metadataActionCreators';
import { entityLoadRequest } from './state/entityActionCreators';

import EntityPageElement from './EntityPageElement';

const mapStateToProps = state => ({ mode: state.entity.mode });

const mapDispatchToProps = dispatch => ({
  showEntity: (entityId, mode) => dispatch(entityLoadRequest(entityId, mode)),
  metadataRequest: metadataType => dispatch(metadataRequest(metadataType)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { entityId, mode } = this.props.match.params;
      if (entityId) {
        this.props.showEntity(entityId, (mode || 'VIEW').toUpperCase());
      }
      this.props.metadataRequest('entityTypes');
    },
  }),
);

export default enhance(EntityPageElement);
