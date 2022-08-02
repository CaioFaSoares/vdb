import React from 'react';
import { POOL_COST, BLOOD_COST, CARD_TEXT, BURN_OPTION } from 'utils/constants';
import {
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  ResultLibraryTypeImage,
  TwdCardsHistoryCardAppearance,
} from 'components';
import { useApp } from 'context';

const TwdCardsHistoryCard = ({ card, byPlayer, handleClick }) => {
  const { isMobile, nativeLibrary } = useApp();

  return (
    <>
      {!isMobile && (
        <>
          <td
            className={card[BLOOD_COST] ? 'cost blood px-1' : 'cost px-1'}
            onClick={() => handleClick()}
          >
            <ResultLibraryCost
              valueBlood={card[BLOOD_COST]}
              valuePool={card[POOL_COST]}
            />
          </td>
          <td className="type px-1" onClick={() => handleClick()}>
            <ResultLibraryTypeImage value={card.Type} />
          </td>
          <td className="disciplines px-1" onClick={() => handleClick()}>
            <ResultLibraryClan value={card.Clan} />
            {card.Discipline && card.Clan && '+'}
            <ResultLibraryDisciplines value={card.Discipline} />
          </td>
        </>
      )}
      <td
        className={`name px-1 ${card.deckid ? '' : 'bold'}`}
        onClick={() => handleClick()}
      >
        <ResultLibraryName card={card} />
      </td>
      {/* {!isMobile && ( */}
      {/*   <td className="burn px-1" onClick={() => handleClick()}> */}
      {/*     <ResultLibraryBurn value={card[BURN_OPTION]} /> */}
      {/*     <ResultLibraryTrifle value={nativeLibrary[card.Id][CARD_TEXT]} /> */}
      {/*   </td> */}
      {/* )} */}
      <TwdCardsHistoryCardAppearance card={card} byPlayer={byPlayer} />
    </>
  );
};

export default TwdCardsHistoryCard;
