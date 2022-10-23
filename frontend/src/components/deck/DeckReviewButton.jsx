import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PencilSquare from 'assets/images/icons/pencil-square.svg';
import { useApp } from 'context';
import { ButtonIconed } from 'components';

const DeckReviewButton = ({ deck }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [snapshotId, setSnapshotId] = useState(undefined);
  const navigate = useNavigate();

  const getSnapshot = () => {
    const cards = {};
    Object.keys(deck.crypt).map((cardid) => {
      cards[cardid] = deck.crypt[cardid].q;
    });
    Object.keys(deck.library).map((cardid) => {
      cards[cardid] = deck.library[cardid].q;
    });

    const url = `${process.env.API_URL}deck`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: deck.name,
        description: deck.description,
        author: deck.author,
        cards: cards,
        tags: deck.tags,
        anonymous: true,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setSnapshotId(data.deckid);
      });
  };

  useEffect(() => {
    if (snapshotId) {
      navigate(`/review/${snapshotId}`);
      setShowMenuButtons(false);
      setShowFloatingButtons(true);
    }
  }, [snapshotId]);

  return (
    <ButtonIconed
      variant="secondary"
      onClick={() => {
        getSnapshot();
      }}
      title="Review Deck"
      icon={<PencilSquare />}
      text="Review"
    />
  );
};

export default DeckReviewButton;
