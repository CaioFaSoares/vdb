import React from 'react';
import Select from 'react-select';
import { useApp } from 'context';

const DeckBranchSelect = (props) => {
  const { setActiveDeck, decks } = useApp();

  const byTimestamp = (a, b) => {
    return new Date(b[1]) - new Date(a[1]);
  };

  const deck = decks[props.deckId];
  const master = decks[deck.master];

  let branches;
  if (master) {
    branches = { [master.deckid]: master };
    master.branches.map((i) => {
      branches[i] = decks[i];
    });
  } else {
    branches = { [deck.deckid]: deck };
    if (deck.branches) {
      deck.branches.map((i) => {
        branches[i] = decks[i];
      });
    }
  }

  const preOptions = Object.keys(branches).map((i, index) => {
    return [
      {
        value: i,
        name: 'deck',
        label: decks[i].branchName,
      },
      decks[i]['timestamp'],
    ];
  });

  const options = preOptions.sort(byTimestamp).map((i, index) => {
    return i[0];
  });

  return (
    <Select
      classNamePrefix="react-select"
      options={options}
      isSearchable={false}
      name="decks"
      placeholder="Select Deck"
      value={options.find((obj) => obj.value === props.deckId)}
      onChange={(e) => {
        props.setActiveDeck
          ? props.setActiveDeck({ src: 'my', deckid: e.value })
          : setActiveDeck({ src: 'my', deckid: e.value });
      }}
    />
  );
};

export default DeckBranchSelect;
