import React from 'react';
import { SelectAsync, SelectLabelCrypt } from '@/components';
import { useFilters } from '@/hooks';
import { useApp } from '@/context';

const NewCryptCard = ({ inInventory, onChange, autoFocus, ref }) => {
  const { isMobile, cryptCardBase, playtest } = useApp();
  const { filterCrypt } = useFilters(cryptCardBase);

  const byTwd = (a, b) => {
    return cryptCardBase[b.value].Twd - cryptCardBase[a.value].Twd;
  };

  const getOptionLabel = (option) => {
    return <SelectLabelCrypt cardid={option.value} inInventory={inInventory} />;
  };

  const loadOptions = async (inputValue) => {
    if (inputValue.length > 2) {
      const input = { name: inputValue };

      const filteredCards = filterCrypt(input)
        .filter((card) => playtest || card.Id < 210000)
        .map((card) => ({
          value: card.Id,
        }));

      return filteredCards.sort(byTwd);
    }
  };

  return (
    <SelectAsync
      autoFocus={autoFocus}
      cacheOptions
      getOptionLabel={getOptionLabel}
      loadOptions={loadOptions}
      menuPlacement={isMobile ? 'top' : 'bottom'}
      onChange={onChange}
      placeholder="Add Crypt Card"
      ref={ref}
    />
  );
};

export default NewCryptCard;
