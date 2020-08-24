import React, { useState, useEffect } from 'react';
import DeckNewDeck from './components/DeckNewDeck.jsx';
import DeckSelectDeck from './components/DeckSelectDeck.jsx';
import DeckShowDeck from './components/DeckShowDeck.jsx';
import DeckRemoveDeck from './components/DeckRemoveDeck.jsx';

function Deck(props) {
  const [sharedDecks, setSharedDecks] = useState(undefined);

  const getDeck = () => {
    const url = 'http:127.0.0.1:5001/api/deck/' + props.id;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        if (data.error === undefined) {
          setSharedDecks(data);
        } else {
          console.log('error: ', data.error);
        }
      })
      .then(() => props.setActiveDeck(props.id));
  };

  const deckCardChange = (deckid, cardid, count) => {
    const url = 'http://127.0.0.1:5001/api/deck/' + deckid;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({update: {[cardid]: count}})
    };

    fetch(url, options)
      .then(() => props.getDecks());
  };

  const deckCardAdd = (deckid, cardid) => {
    const url = 'http://127.0.0.1:5001/api/deck/' + deckid;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({update: {[cardid]: 1}})
    };

    fetch(url, options)
      .then(() => props.getDecks());
  };

  const deckUpdate = (deckid, field, value) => {
    const url = 'http://127.0.0.1:5001/api/deck/' + deckid;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({[field]: value})
    };

    fetch(url, options)
      .then(() => props.getDecks());
  };

  useEffect(() => {
    props.getDecks();
  }, []);

  useEffect(() => {
    if (props.id) {
      getDeck();
    }
  }, [props.id]);


  return (
    <div className='container main-container py-xl-3 px-0 px-xl-2'>
      <div className='row mx-0'>
        <div className='col-md-12 col-lg-1 col-xl-2 px-0 px-xl-2'>
        </div>

        <div className='col-md-12 col-lg-10 col-xl-8 px-0 px-xl-2'>
          <DeckNewDeck setActiveDeck={props.setActiveDeck} getDecks={props.getDecks} />
          <DeckRemoveDeck activeDeck={props.activeDeck} />
          <br />
          { sharedDecks ?
            <DeckShowDeck deckUpdate={deckUpdate} deckCardAdd={deckCardAdd} deckCardChange={deckCardChange} deck={sharedDecks[props.activeDeck]} />
            :
            <DeckShowDeck deckUpdate={deckUpdate} deckCardAdd={deckCardAdd} deckCardChange={deckCardChange} deck={props.decks[props.activeDeck]} />
          }
        </div>

        <div className='col-md-12 col-lg-1 col-xl-2 px-0 px-xl-2'>
        </div>
      </div>
    </div>
  );
}

export default Deck;
