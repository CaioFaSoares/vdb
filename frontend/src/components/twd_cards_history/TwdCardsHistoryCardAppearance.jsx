import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TwdOpenDeckButton } from 'components';
import { useApp, clearSearchForm, searchTwdForm } from 'context';

const TwdCardsHistoryCardAppearance = ({ card, byPlayer }) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();

  let yearsToWin = null;
  if (card.twd_date) {
    yearsToWin =
      Math.round(
        (new Date(card.twd_date) - new Date(card.release_date)) /
          (1000 * 60 * 60 * 24) /
          365
      ) || 1;
  } else {
    const date = new Date();
    yearsToWin = `${date.getFullYear() - card.release_date.slice(0, 4)}+`;
  }

  const handleClick = (author) => {
    clearSearchForm('twd');
    searchTwdForm.author = author;
    navigate(
      `/twd?q=${encodeURIComponent(JSON.stringify({ author: author }))}`
    );
  };

  return (
    <>
      <div
        className={`flex items-center justify-center year ${
          card.deckid ? '' : 'font-bold text-blue'
        }`}
      >
        {card.release_date.slice(0, 4)}
      </div>
      {!isMobile && (
        <div className="flex items-center justify-center year">
          {card.twd_date && card.twd_date.slice(0, 4)}
        </div>
      )}
      <div
        className={`flex items-center justify-center ytw ${
          card.deckid ? '' : 'font-bold text-blue'
        }`}
      >
        {yearsToWin}
      </div>
      <div className="flex items-center justify-between items-center player">
        <div
          className="inline link-like"
          onClick={() => handleClick(card.player)}
        >
          {card.player}
        </div>
        {!isMobile && byPlayer && (
          <div
            className="inline ps-2"
            title={`First appearance in TWDA:
Crypt: ${byPlayer.crypt}
Library: ${byPlayer.library}`}
          >
            [{byPlayer.crypt + byPlayer.library}]
          </div>
        )}
      </div>
      <div className="flex items-center justify-end button pe-1">
        {card.deckid && (
          <TwdOpenDeckButton deckid={card.deckid} noText={isMobile} inHistory />
        )}
      </div>
    </>
  );
};

export default TwdCardsHistoryCardAppearance;
