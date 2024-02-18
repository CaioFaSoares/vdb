import React from 'react';
import { useNavigate } from 'react-router-dom';
import PencilSquare from '@/assets/images/icons/pencil-square.svg?react';
import { useApp } from '@/context';
import { ButtonIconed } from '@/components';

const DeckReviewButton = ({ deck }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons, publicName } =
    useApp();
  const navigate = useNavigate();

  const getSnapshot = () => {
    const cards = {};
    Object.keys(deck.crypt).forEach((cardid) => {
      cards[cardid] = deck.crypt[cardid].q;
    });
    Object.keys(deck.library).forEach((cardid) => {
      cards[cardid] = deck.library[cardid].q;
    });

    const url = `${import.meta.env.VITE_API_URL}/deck`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: deck.name,
        description: `Review of ${import.meta.env.VITE_BASE_URL}/decks/${
          deck.deckid
        }`,
        author: publicName ? `review by ${publicName}` : '',
        cards: cards,
        tags: deck.tags,
        anonymous: true,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        navigate(`/review/${data.deckid}`);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
      });
  };

  return (
    <ButtonIconed
      variant={isDesktop ? 'secondary' : 'primary'}
      onClick={getSnapshot}
      title="Review Deck"
      icon={<PencilSquare />}
      text="Review"
    />
  );
};

export default DeckReviewButton;
