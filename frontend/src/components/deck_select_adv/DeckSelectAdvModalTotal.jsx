import React from 'react';
import { useSnapshot } from 'valtio';
import { deckStore } from '@/context';

const DeckSelectAdvModalTotal = ({ tagsFilter, setTagsFilter }) => {
  const decks = useSnapshot(deckStore).decks;
  const byTags = {};
  let total = 0;

  const handleClick = (tag) => {
    if (!tagsFilter.includes(tag)) {
      setTagsFilter([...tagsFilter, tag]);
    } else {
      setTagsFilter(tagsFilter.filter((i) => i !== tag));
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

  return (
    <div className="flex items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
      <div className="whitespace-nowrap font-bold p-2">TOTAL: {total}</div>
      <div>
        {Object.keys(byTags)
          .sort()
          .map((i) => {
            return (
              <div
                key={i}
                onClick={() => handleClick(i)}
                className="inline-block whitespace-nowrap px-2"
              >
                <div className="inline pr-0.5 font-bold text-fgSecondary dark:text-fgSecondaryDark">
                  {i}:
                </div>
                {byTags[i]}
              </div>
            );
          })}
      </div>
      <div />
    </div>
  );
};

export default DeckSelectAdvModalTotal;
