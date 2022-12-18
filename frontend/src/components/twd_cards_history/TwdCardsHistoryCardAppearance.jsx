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
        className={`year flex items-center justify-center ${
          card.deckid ? '' : 'text-blue font-bold'
        }`}
      >
        {card.release_date.slice(0, 4)}
      </div>
      {!isMobile && (
        <div className="year flex items-center justify-center">
          {card.twd_date && card.twd_date.slice(0, 4)}
        </div>
      )}
      <div
        className={`ytw flex items-center justify-center ${
          card.deckid ? '' : 'text-blue font-bold'
        }`}
      >
        {yearsToWin}
      </div>
      <div className="player flex items-center items-center justify-between">
        <div
          className="link-like inline"
          onClick={() => handleClick(card.player)}
        >
          {card.player}
        </div>
        {!isMobile && byPlayer && (
          <div
            className="inline "
            title={`First appearance in TWDA:
Crypt: ${byPlayer.crypt}
Library: ${byPlayer.library}`}
          >
            [{byPlayer.crypt + byPlayer.library}]
          </div>
        )}
      </div>
      <div className="flex items-center justify-end ">
        {card.deckid && (
          <TwdOpenDeckButton deckid={card.deckid} noText={isMobile} inHistory />
        )}
      </div>
    </>
  );
};

export default TwdCardsHistoryCardAppearance;
