import React from 'react';
import LightbulbFill from 'assets/images/icons/lightbulb-fill.svg';
import LightbulbOffFill from 'assets/images/icons/lightbulb-off-fill.svg';
import { useApp } from 'context';
import { ButtonIconed } from 'components';

const DeckHideButton = ({ deckid }) => {
  const { decks, deckUpdate } = useApp();
  const deck = decks[deckid];

  const handleClick = () => {
    deckUpdate(deckid, 'isHidden', !deck.isHidden);
  };

  return (
    <ButtonIconed
      variant="primary"
      onClick={handleClick}
      title={`${deck.isHidden ? 'Hidden' : 'Shown'} in Deck Selector`}
      icon={
        deck.isHidden ? (
          <LightbulbOffFill width="16" height="23" viewBox="0 0 16 16" />
        ) : (
          <LightbulbFill width="16" height="23" viewBox="0 0 16 16" />
        )
      }
    />
  );
};

export default DeckHideButton;
