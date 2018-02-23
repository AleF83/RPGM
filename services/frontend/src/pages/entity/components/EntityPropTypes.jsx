import PropTypes from 'prop-types';

export const EntitySummaryPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  summary: PropTypes.string,
});

export const EntityPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  summary: PropTypes.string,
  description: PropTypes.object,
});
