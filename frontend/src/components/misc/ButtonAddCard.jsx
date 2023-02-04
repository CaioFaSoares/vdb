import React from 'react';
import { useSnapshot } from 'valtio';
import { Button } from '@/components';
import { deckStore, deckCardChange } from '@/context';

const ButtonAddCard = ({ deckid, card, inDeck, inQuick }) => {
  const decks = useSnapshot(deckStore).decks;

  const onClick = () => {
    deckCardChange(deckid, card, inDeck + 1);
  };

  let title = 'Add to Deck';
  if (inQuick && decks?.[deckid]) {
    title = inDeck
      ? `In deck "${decks[deckid].name}"`
      : `Add to Deck "${decks[deckid].name}"`;
  }

  return (
    <Button
      className="h-[33px] w-[24px] px-0 py-0"
      variant={inDeck ? 'third' : 'primary'}
      onClick={onClick}
      title={title}
    >
      {inDeck ? inDeck : '+'}
    </Button>
  );
};

export default ButtonAddCard;
