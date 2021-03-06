import React from 'react';
import { Button } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import PlayCircleFill from '../../assets/images/icons/play-circle-fill.svg';

function TwdOpenDeckButton(props) {
  // const deckUrl = `/decks?id=${deckid}`;
  const handleClick = () => {
    props.setActiveDeck({ src: 'twd', deckid: props.deckid });
    return <Redirect to="/decks" />;
  };

  return (
    <Link to="/decks" className="noUnderline">
      <Button onClick={handleClick} variant="outline-secondary" block>
        <PlayCircleFill />
        <span className="pl-1">Open Deck</span>
      </Button>
    </Link>
  );
}

export default TwdOpenDeckButton;
