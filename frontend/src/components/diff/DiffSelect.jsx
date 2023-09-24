import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLeftRight from '@/assets/images/icons/arrow-left-right.svg?react';
import { DiffSelectDeck, Button } from '@/components';

const DiffSelect = ({ decks, deck, deckTo, deckidFrom, deckidTo }) => {
  const navigate = useNavigate();

  const handleSwap = () => {
    navigate(`/diff/${deckidTo}/${deckidFrom}`);
  };

  return (
    <div className="flex gap-2 max-sm:flex-col sm:gap-4 lg:gap-6 xl:gap-8">
      <div className="basis-full sm:basis-1/2">
        <DiffSelectDeck
          target="from"
          title="Deck You Edit"
          deck={deck}
          decks={decks}
          deckidFrom={deckidFrom}
          deckidTo={deckidTo}
        />
      </div>
      <div className="flex items-center justify-center">
        <Button variant="primary" onClick={handleSwap}>
          <ArrowLeftRight />
        </Button>
      </div>
      <div className="basis-full sm:basis-1/2">
        <DiffSelectDeck
          target="to"
          title="Show Changes Against:"
          deck={deckTo}
          decks={decks}
          deckidFrom={deckidFrom}
          deckidTo={deckidTo}
        />
      </div>
    </div>
  );
};

export default DiffSelect;
