import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { metadataRequest } from './state/metadataActionCreators';

import EntityPageElement from './EntityPageElement';

const mapStateToProps = state => ({ mode: state.entity.mode });

const mapDispatchToProps = dispatch => ({
  metadataRequest: metadataType => dispatch(metadataRequest(metadataType)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.metadataRequest('entityTypes');
    },
  }),
);

export default enhance(EntityPageElement);
