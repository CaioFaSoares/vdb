import React from 'react';
import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';
import DeckDraw from './DeckDraw.jsx';
import DeckNewCardId from './DeckNewCardId.jsx';
import DeckNewCryptName from './DeckNewCryptName.jsx';
import DeckNewLibraryName from './DeckNewLibraryName.jsx';
import DeckNameDeck from './DeckNameDeck.jsx';
import DeckDescriptionDeck from './DeckDescriptionDeck.jsx';

function DeckShowDeck(props) {
  if (props.deck !== undefined) {
    return (
      <React.Fragment>
        <b>Deck Name:</b>
        <DeckNameDeck name={props.deck.name} deckUpdate={props.deckUpdate} deckid={props.deck.deckid} />
        <br />
        <b>Description: </b>
        <DeckDescriptionDeck description={props.deck.description} deckUpdate={props.deckUpdate} deckid={props.deck.deckid} />
        <br />
        <DeckNewCryptName deckCardAdd={props.deckCardAdd} deckid={props.deck.deckid} />
        <DeckNewLibraryName deckCardAdd={props.deckCardAdd} deckid={props.deck.deckid} />
        <br />
        {/* <DeckNewCardId deckCardAdd={props.deckCardAdd} deckid={props.deck.deckid} /> */}
        {/* <br /> */}
        <DeckDraw crypt={props.deck.crypt} library={props.deck.library} />
        <DeckCrypt deckCardChange={props.deckCardChange} deckid={props.deck.deckid} cards={props.deck.crypt} />
        <br />
        <DeckLibrary deckCardChange={props.deckCardChange} deckid={props.deck.deckid} cards={props.deck.library} />
        <br />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment></React.Fragment>
    );
  };
}

export default DeckShowDeck;
