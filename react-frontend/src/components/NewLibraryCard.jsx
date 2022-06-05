import React from 'react';
import AsyncSelect from 'react-select/async';
import { SelectLabelLibrary } from 'components';
import { useFilters } from 'hooks';
import { useApp } from 'context';

const NewLibraryCard = ({
  inInventory,
  selectedValue,
  onChange,
  autoFocus,
  newRef,
}) => {
  const { libraryCardBase } = useApp();
  const { filterLibrary } = useFilters(libraryCardBase);

  const getOptionLabel = (option) => {
    return (
      <SelectLabelLibrary cardid={option.value} inInventory={inInventory} />
    );
  };

  const loadOptions = async (inputValue) => {
    if (inputValue.length > 2) {
      const input = { name: inputValue };

      const filteredCards = filterLibrary(input).map((card) => ({
        value: card.Id,
      }));

      return filteredCards;
    }
  };

  return (
    <AsyncSelect
      ref={newRef}
      classNamePrefix="react-select"
      cacheOptions
      autoFocus={autoFocus}
      value={selectedValue}
      placeholder="Add Library Card"
      loadOptions={loadOptions}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
    />
  );
};

export default NewLibraryCard;
