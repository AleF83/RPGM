import React from 'react';
import PropTypes from 'prop-types';

const EntityListItem = ({
  entity, isSelected, onSelect, onDelete,
}) => (
  <tr>
    <td>
      <div role="presentation" onClick={onSelect(entity.id)}>
        Entity List Item<br />
        Name: {entity.name} <br />
        Summary: {entity.summary} <br />
      </div>
      <button onClick={onDelete(entity.id)}>Delete</button>
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
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EntityListItem;
