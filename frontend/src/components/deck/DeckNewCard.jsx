import React, { useEffect, useState } from 'react';
import { NewCryptCard, NewLibraryCard } from 'components';
import { useApp, deckCardChange } from 'context';

const DeckNewCard = ({ target, cards, deckid, setShowAdd, cardChange }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const [selectedValue, setSelectedValue] = useState(null);
  const changeAction = cardChange ? cardChange : deckCardChange;

  const addNewCard = () => {
    if (!(cards[selectedValue] && cards[selectedValue].q > 0)) {
      changeAction(deckid, selectedValue, 1, cryptCardBase, libraryCardBase);
    }
    setSelectedValue('');
    setShowAdd && setShowAdd(false);
  };

  useEffect(() => {
    if (selectedValue) addNewCard();
  }, [selectedValue]);

  return (
    <>
      {target === 'crypt' && (
        <NewCryptCard
          selectedValue={selectedValue}
          onChange={(value) => setSelectedValue(value.value)}
          autoFocus={true}
        />
      )}
      {target === 'library' && (
        <NewLibraryCard
          selectedValue={selectedValue}
          onChange={(value) => setSelectedValue(value.value)}
          autoFocus={true}
        />
      )}
    </>
  );
};

export default DeckNewCard;
