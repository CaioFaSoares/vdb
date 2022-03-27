import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import { ModalConfirmation } from 'components';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

function DeckTogglePublicButton(props) {
  const { setDecks } = useApp();

  const [spinnerState, setSpinnerState] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const isPublished =
    props.deck.public_parent || props.deck.public_child ? true : false;

  const handleConfirmation = () => {
    createOrDelete();
    setShowConfirmation(false);
  };

  const createOrDelete = () => {
    const url = `${process.env.API_URL}pda/${
      isPublished ? props.deck.public_child : props.deck.deckid
    }`;
    const options = {
      method: isPublished ? 'DELETE' : 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setSpinnerState(true);
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setDecks((prevState) => {
          return {
            ...prevState,
            [data.parent]: {
              ...prevState[data.parent],
              public_child: isPublished ? null : data.child,
            },
          };
        });
      });

    setSpinnerState(false);
  };

  return (
    <>
      <ButtonIconed
        variant={props.deck.public_child ? 'third' : 'primary'}
        onClick={() => setShowConfirmation(true)}
        title="Add/Remove from Public Deck Archive"
        icon={
          !spinnerState ? (
            <PeopleFill width="16" height="23" viewBox="0 0 16 18" />
          ) : (
            <Spinner animation="border" size="sm" />
          )
        }
      />

      <ModalConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirmation}
        handleCancel={() => setShowConfirmation(false)}
        headerText={
          isPublished
            ? `Remove "${props.deck.name}" from Public Deck Archive?`
            : `Add "${props.deck.name}" to Public Deck Archive?`
        }
        mainText={props.deck.public_child ? '' : ''} // TODO
        buttonText={`${isPublished ? 'Remove' : 'Make'} Public`}
      />
    </>
  );
}

export default DeckTogglePublicButton;
