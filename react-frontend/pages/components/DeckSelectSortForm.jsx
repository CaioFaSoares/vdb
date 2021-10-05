import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import SortDown from '../../assets/images/icons/sort-down.svg';

function DeckSelectSortForm(props) {
  const sortMethods = { Name: 'byName', Date: 'byDate' };

  const SortButtonOptions = Object.keys(sortMethods).map((k) => {
    return (
      <Dropdown.Item key={k} onClick={() => props.onChange(sortMethods[k])}>
        Sort by {k}
      </Dropdown.Item>
    );
  });

  return (
    <DropdownButton
      variant="primary"
      id="sort-button"
      className="d-inline"
      title={<SortDown />}
    >
      {SortButtonOptions}
    </DropdownButton>
  );
}

export default DeckSelectSortForm;
