import React from 'react';
import Shuffle from '@/assets/images/icons/shuffle.svg';
import PinAngleFill from '@/assets/images/icons/pin-angle-fill.svg';

const UsedDescriptionDeck = ({ deck, t, q }) => {
  const isBranches = deck.master || (deck.branches && deck.branches.length > 0);

  return (
    <div className="flex items-center space-x-1">
      <div className="opacity-40">
        {t == 's' ? (
          <Shuffle width="14" height="14" viewBox="0 0 16 16" />
        ) : (
          <PinAngleFill width="14" height="14" viewBox="0 0 16 16" />
        )}
      </div>
      <b>{q}</b>
      <div className="max-w-[175px] sm:max-w-[200px]">
        {` - ${deck.name}${isBranches ? ` [${deck.branchName}]` : ''} `}
      </div>
    </div>
  );
};

const UsedDescription = ({ usedCards, decks, inventoryType }) => {
  return (
    <>
      {Object.keys(usedCards).map((id) => {
        return (
          <UsedDescriptionDeck
            key={id}
            q={usedCards[id]}
            deck={decks[id]}
            t={inventoryType}
          />
        );
      })}
    </>
  );
};

export default UsedDescription;
