import React from 'react';
import PropTypes from 'prop-types';

const EntityListItem = ({
  entity, isSelected, selectEntity, deleteEntity,
}) => (
  <tr>
    <td>
      <div role="presentation" onClick={selectEntity(entity.id)}>
        Entity List Item<br />
        Name: {entity.name} <br />
        Summary: {entity.summary} <br />
      </div>
      <button onClick={deleteEntity(entity.id)}>Delete</button>
      {isSelected && <span>Selected</span>}
    </td>
  </tr>
);

EntityListItem.propTypes = {
  entity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    summary: PropTypes.string,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  selectEntity: PropTypes.func.isRequired,
  deleteEntity: PropTypes.func.isRequired,
};

export default EntityListItem;
