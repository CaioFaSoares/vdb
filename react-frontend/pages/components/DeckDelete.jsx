import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TrashFill from '../../assets/images/icons/trash-fill.svg';
import DeleteConfirmation from './DeleteConfirmation.jsx';
import AppContext from '../../context/AppContext.js';

function DeckDelete(props) {
  const { getDecks, setActiveDeck, isMobile } = useContext(AppContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const history = useHistory();

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteDeck();
    setShowConfirmation(false);
    setActiveDeck({ src: null, deckid: null });
    history.push('/decks');
    isMobile && props.setShowButtons(false);
  };

  const deleteDeck = () => {
    const url = `${process.env.API_URL}decks/remove`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deckid: props.deck.deckid }),
    };
    fetch(url, options).then(() => getDecks());
  };

  return (
    <>
      <Button
        variant={props.noText ? 'primary' : 'secondary'}
        onClick={() => setShowConfirmation(true)}
      >
        <div className="d-flex justify-content-center align-items-center">
          <div className={props.noText ? null : 'pe-2'}>
            <TrashFill />
          </div>
          {!props.noText && 'Delete Deck'}
        </div>
      </Button>
      <DeleteConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        target={`deck "${props.deck.name}" and all its versions`}
      />
    </>
  );
}

export default DeckDelete;
