import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function DeckImportDeck(props) {
  const [deckName, setDeckName] = useState('');
  const [deckText, setDeckText] = useState('');

  const handleChange = event => {
    setDeckText(event.target.value);
  };

  const clearFormButton = () => {
    setDeckText('');
  };

  const createImportDeck = () => {
    if (deckText) {
      console.log(deckText);
      // let newdeckid;
      // const url = process.env.API_URL + 'decks/create';
      // const options = {
      //   method: 'POST',
      //   mode: 'cors',
      //   credentials: 'include',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     deckname: deckName,
      //     decktext: deckText,
      //   }),
      // };

      // fetch(url, options)
      //   .then(response => response.json())
      //   .then(data => {
      //     if (data.error === undefined) {
      //       newdeckid = data.deckid;
      //       console.log('new deck id:', newdeckid);
      //     } else {
      //       console.log('error: ', data.error);
      //     };
      //   })
      //   .then(() => props.getDecks())
      //   .then(() => props.setActiveDeck(newdeckid));

    } else {
      console.log('Error: submit with empty forms');
    };
  };

  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">
          Import Deck
          <br />
          TWD / LackeyCCG
        </span>
      </div>
      <textarea className="form-control"
                value={deckText}
                onChange={handleChange}
      />
      <Button variant='outline-secondary' onClick={createImportDeck}>
        Import
      </Button>
      <Button variant='outline-secondary' onClick={clearFormButton}>
        Clear
      </Button>
    </div>
  );
}

export default DeckImportDeck;
