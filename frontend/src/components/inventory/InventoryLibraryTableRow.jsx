import React from 'react';
// import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  InventoryCardQuantity,
  InventoryCardQuantityDiff,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
  ResultName,
  ResultLibraryTrifle,
  ConditionalTooltip,
} from '@/components';
import { POOL_COST, BLOOD_COST, BURN_OPTION } from '@/utils/constants';
import { getHardTotal, getSoftMax } from '@/utils';
import {
  useApp,
  usedStore,
  limitedStore,
  // inventoryCardChange,
} from '@/context';
// import { useSwipe, useDebounce } from '@/hooks';

const InventoryLibraryTableRow = ({ card, compact, newFocus, inShared, handleClick }) => {
  const { isMobile, isNarrow, limitedMode } = useApp();
  const usedLibrary = useSnapshot(usedStore).library;
  const limitedLibrary = useSnapshot(limitedStore).library;
  const inLimited = limitedLibrary[card.c.Id];
  const softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]);
  const hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]);

  // TODO fix bg-color changes on swipes (not working probably because of virtualized as same code work in Decks)
  // removed as without bg-color it is very easy to mistakenly swipe and not even notice
  //
  // const [isSwiped, setIsSwiped] = useState();
  // useDebounce(() => setIsSwiped(false), 500, [isSwiped]);
  // const swipeHandlers = useSwipe(
  //   () => {
  //     setIsSwiped('left');
  //     inventoryCardChange(card.c, card.q - 1);
  //   },
  //   () => {
  //     setIsSwiped('right');
  //     inventoryCardChange(card.c, card.q + 1);
  //   },
  // );
  //
  // const trBg = isSwiped
  //   ? isSwiped === 'right'
  //     ? 'bg-bgSuccess dark:bg-bgSuccessDark'
  //     : 'bg-bgErrorSecondary dark:bg-bgErrorSecondaryDark'
  //   : '';

  return (
    // <div className={`flex w-full items-center ${trBg}`} {...swipeHandlers}>
    <div className="flex w-full items-center">
      {inShared ? (
        <div
          className={`flex h-full min-w-[45px] items-center justify-center border-r border-bgSecondary bg-blue/5 text-lg dark:border-bgSecondaryDark`}
        >
          {card.q || null}
        </div>
      ) : (
        <div className="flex min-w-[80px] px-0.5">
          <InventoryCardQuantity
            card={card}
            softUsedMax={softUsedMax}
            hardUsedTotal={hardUsedTotal}
            compact={compact}
            newFocus={newFocus}
          />
        </div>
      )}
      {!inShared && (
        <div className="flex min-w-[40px] justify-center">
          <InventoryCardQuantityDiff
            card={card}
            softUsedMax={softUsedMax}
            hardUsedTotal={hardUsedTotal}
          />
        </div>
      )}
      <div className="flex min-w-[40px] justify-center" onClick={() => handleClick(card.c)}>
        <ResultLibraryTypeImage value={card.c.Type} />
      </div>
      <div className="flex w-full" onClick={() => handleClick(card.c)}>
        <ConditionalTooltip
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile}
          className="flex w-full"
          noPadding
        >
          <div className="flex cursor-pointer">
            <ResultName card={card.c} isBanned={limitedMode && !inLimited} />
          </div>
        </ConditionalTooltip>
      </div>
      {isMobile ? (
        <div className="flex min-w-[82px] justify-between" onClick={() => handleClick(card.c)}>
          {(card.c[BLOOD_COST] || card.c[POOL_COST]) && (
            <div
              className={`flex min-w-[22px] justify-center ${card.c[BLOOD_COST] && 'pb-1'}`}
              onClick={() => handleClick(card.c)}
            >
              <ResultLibraryCost valueBlood={card.c[BLOOD_COST]} valuePool={card.c[POOL_COST]} />
            </div>
          )}
          <div className="flex w-full items-center justify-end" onClick={() => handleClick(card.c)}>
            {card.c.Clan && <ResultLibraryClan value={card.c.Clan} />}
            {card.c.Discipline && card.c.Clan && '+'}
            {card.c.Discipline && <ResultLibraryDisciplines value={card.c.Discipline} />}
          </div>
        </div>
      ) : (
        <>
          <div
            className={`flex min-w-[30px] justify-center ${card.c[BLOOD_COST] && 'pb-1'}`}
            onClick={() => handleClick(card.c)}
          >
            {(card.c[BLOOD_COST] || card.c[POOL_COST]) && (
              <ResultLibraryCost valueBlood={card.c[BLOOD_COST]} valuePool={card.c[POOL_COST]} />
            )}
          </div>
          <div className="flex min-w-[82px] justify-center" onClick={() => handleClick(card.c)}>
            {card.c.Clan && <ResultLibraryClan value={card.c.Clan} />}
            {card.c.Discipline && card.c.Clan && '+'}
            {card.c.Discipline && <ResultLibraryDisciplines value={card.c.Discipline} />}
          </div>
        </>
      )}
      {!isNarrow && (
        <div className="flex min-w-[30px] justify-center" onClick={() => handleClick(card.c)}>
          {card.c[BURN_OPTION] && <ResultLibraryBurn />}
          {card.c.Trifle && <ResultLibraryTrifle />}
        </div>
      )}
    </div>
  );
};

export default InventoryLibraryTableRow;
