import React from 'react';
import { useSnapshot } from 'valtio';
import { Button } from 'components';
import { deckStore, deckCardChange } from 'context';

const ButtonAddCard = ({ deckid, card, inDeck, inQuick }) => {
  const decks = useSnapshot(deckStore).decks;

  const handleButton = () => {
    deckCardChange(deckid, card, inDeck + 1);
  };

  let title = 'Add to Deck';
  if (inQuick && decks && decks[deckid]) {
    title = inDeck
      ? `In deck "${decks[deckid].name}"`
      : `Add to Deck "${decks[deckid].name}"`;
  }

  return (
    <Button
      className={`h-[33px] w-[24px] p-0 ${inDeck > 0 ? 'in' : ''}`}
      variant="primary"
      onClick={handleButton}
      title={title}
    >
      {inDeck ? inDeck : '+'}
    </Button>
  );
};

export default ButtonAddCard;
