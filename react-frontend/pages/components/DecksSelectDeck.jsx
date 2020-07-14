import React, { useEffect, useState } from 'react';

function DecksSelectDeck(props) {
  const handleActiveDeckSelect = props.handleActiveDeckSelect;
  const decks = props.decks;
  const activedeck = props.value;
  const decksform = Object.keys(decks).map( (i, index) => {
    return (
      <option key={index} value={i}>{decks[i]['name']}</option>
    );
  });

  return (
    <div>
      <select defaultValue="" className="custom-select" value={activedeck} onChange={handleActiveDeckSelect} >
        <option value="" disabled hidden>Select deck</option>
        {decksform}
      </select>
    </div>
  );
};

export default DecksSelectDeck;
