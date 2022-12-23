import React from 'react';
import { useSnapshot } from 'valtio';
import { deckStore } from 'context';

const DeckSelectAdvModalTotal = ({ tagsFilter, setTagsFilter }) => {
  const decks = useSnapshot(deckStore).decks;
  const byTags = {};
  let total = 0;

  const handleClick = (tag) => {
    if (!tagsFilter.includes(tag)) {
      setTagsFilter([...tagsFilter, tag]);
    }
  };

  Object.values(decks).map((deck) => {
    if (deck.tags) {
      deck.tags.map((tag) => {
        if (byTags[tag]) {
          byTags[tag] += 1;
        } else {
          byTags[tag] = 1;
        }
      });
      total += 1;
    }
  });

  const totalOutput = Object.keys(byTags).map((k) => {
    return (
      <span
        key={k}
        onClick={() => handleClick(k)}
        className="inline-block whitespace-nowrap "
      >
        <span className="text-fgSecondary dark:text-fgSecondaryDark">
          <b>{k}:</b>
        </span>
        {byTags[k]}
      </span>
    );
  });

  const value = (
    <>
      <div className="whitespace-nowrap ">
        <b>TOTAL: {total}</b>
      </div>
      <div>{totalOutput}</div>
      <div />
    </>
  );

  return (
    <div className="flex items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
      {value}
    </div>
  );
};

export default DeckSelectAdvModalTotal;
