import React from 'react';
import { Menu } from '@headlessui/react';
import SortDown from 'assets/images/icons/sort-down.svg';

const SortButton = ({ sortMethod, setSortMethod, sortMethods }) => {
  return (
    <Menu>
      <Menu.Button title="Sort Crypt" variant="primary">
        <div className="flex items-center justify-center">
          <div className="pe-1 flex">
            <SortDown />
          </div>
          {sortMethods[sortMethod]}
        </div>
      </Menu.Button>
      <Menu.Items>
        {Object.keys(sortMethods).map((i, index) => {
          return (
            <Menu.Item key={index}>
              <div onClick={() => setSortMethod(i)}>Sort by {i}</div>
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default SortButton;
