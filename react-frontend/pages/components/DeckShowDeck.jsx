import React from 'react';
import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';
import DeckDraw from './DeckDraw.jsx';
import DeckNewCard from './DeckNewCard.jsx';
import DeckRenameDeck from './DeckRenameDeck.jsx';
import DeckDescriptionDeck from './DeckDescriptionDeck.jsx';

function DeckShowDeck(props) {
  if (props.deck !== undefined) {
    return (
      <div>
        <b>Deck Name:</b>
        <DeckRenameDeck name={props.deck.name} deckUpdate={props.deckUpdate} deckid={props.deck.deckid} />
        <br />
        <b>Description: </b>
        <DeckDescriptionDeck description={props.deck.description} deckUpdate={props.deckUpdate} deckid={props.deck.deckid} />
        <DeckNewCard deckCardAdd={props.deckCardAdd} deckid={props.deck.deckid} />
        <br />
        <DeckDraw crypt={props.deck.crypt} library={props.deck.library} />
        <DeckCrypt deckCardChange={props.deckCardChange} deckid={props.deck.deckid} cards={props.deck.crypt} />
        <br />
        <DeckLibrary deckCardChange={props.deckCardChange} deckid={props.deck.deckid} cards={props.deck.library} />
        <br />
      </div>
    );
  } else {
    return (
      <div></div>
    );
  };
}

export default DeckShowDeck;
