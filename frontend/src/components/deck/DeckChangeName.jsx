import React, { useState, useEffect } from 'react';
import Check2 from 'assets/images/icons/check2.svg';
import Snow from 'assets/images/icons/snow.svg';
import TagFill from 'assets/images/icons/tag-fill.svg';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import { useApp, deckUpdate } from 'context';
import { Input, Button, DeckFreezeButton } from 'components';

const DeckChangeName = ({ deck }) => {
  const { isMobile } = useApp();
  const { isPublic, isAuthor, isFrozen, isNonEditable } = deck;
  const [state, setState] = useState(deck.name);
  const [buttonState, setButtonState] = useState(false);
  const isEditable = isAuthor && !isPublic && !isFrozen;

  useEffect(() => {
    if (state !== deck.name) setState(deck.name);
  }, [deck.name]);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckChangeName = () => {
    deckUpdate(deck.deckid, 'name', state);
    setButtonState(true);
    setTimeout(() => {
      setButtonState(false);
    }, 1000);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    deckChangeName();
  };

  const handleOnBlur = () => {
    if (state != deck.name) {
      deckChangeName();
    }
  };

  return (
    <form className="my-0" onSubmit={handleSubmitButton}>
      <div className="input-group">
        <div title="Deck Name">
          <TagFill />
        </div>
        <Input
          value={state}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!isEditable}
        />
        {(isPublic ||
          (deck.deckid !== 'deck' &&
            deck.deckid.length !== 32 &&
            !deck.deckid.includes(':'))) && (
          <div title={isPublic ? 'Public Deck' : 'Tournament-Winning Deck'}>
            {isPublic ? <PeopleFill /> : <TrophyFill />}
          </div>
        )}
        {isNonEditable && (
          <div title="Deck is non-editable and will never change">
            <Snow width="16" height="23" viewBox="0 0 16 16" />
          </div>
        )}
        {isAuthor && !isPublic && <DeckFreezeButton deck={deck} />}

        {isMobile && isEditable && (
          <Button
            variant={buttonState ? 'success' : 'primary'}
            type="submit"
            className="ms-1"
          >
            <Check2 />
          </Button>
        )}
      </div>
    </form>
  );
};

export default DeckChangeName;
