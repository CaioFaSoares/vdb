import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function DeckSelect(props) {
  const [state, setState] = useState(props.decks);

  const byTimestamp = (a, b) => {
    return new Date(b[1]) - new Date(a[1]);
  };

  const decksPreOptions = Object.keys(state).map((i, index) => {
    return [
      {
        value: i,
        name: 'deck',
        label: (
          <div className="d-flex justify-content-between">
            {state[i]['name']}
            <div className="pl-2 gray-small">
              {new Date(state[i]['timestamp']).toISOString().slice(0, 10)}
            </div>
          </div>
        ),
      },
      state[i]['timestamp'],
    ];
  });

  const decksOptions = decksPreOptions.sort(byTimestamp).map((i, index) => {
    return i[0];
  });

  useEffect(() => {
    setState(props.decks);
  }, [props.decks]);

  return (
    <Select
      options={decksOptions}
      isSearchable={false}
      name="decks"
      placeholder="Select Deck"
      value={decksOptions.find((obj) => obj.value === props.activeDeck)}
      onChange={(e) => {
        if (e.value) {
          props.setActiveDeck(e.value);
        } else {
          props.setActiveDeck(undefined);
        }
      }}
    />
  );
}

export default DeckSelect;
