import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { DeckCryptTable, DeckCryptHeader, ResultModal } from '@/components';
import { useApp, deckStore } from '@/context';
import {
  useModalCardController,
  useKeyDisciplines,
  useDeckCrypt,
} from '@/hooks';

const DeckCrypt = ({ inSearch, inAdvSelect, inMissing, deck }) => {
  const { cryptDeckSort, changeCryptDeckSort, isMobile } = useApp();
  const changeTimer = useSnapshot(deckStore).cryptTimer;
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;
  const [showInfo, setShowInfo] = useState(false);

  const sortMethods = {
    Capacity: 'C',
    'Clan ': 'CL ', // SPACE SUFFIX IS INTENTIONAL
    'Group ': 'G ', // SPACE SUFFIX IS INTENTIONAL
    Name: 'N ',
    'Quantity ': 'Q ', // SPACE SUFFIX IS INTENTIONAL
    Sect: 'S',
  };

  const { crypt, cryptSide, cryptTotal, sortedCards, sortedCardsSide } =
    useDeckCrypt(deck.crypt, cryptDeckSort, changeTimer);

  const { disciplinesSet, keyDisciplines, nonKeyDisciplines, maxDisciplines } =
    useKeyDisciplines(deck.crypt);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards, sortedCardsSide);

  return (
    <div
      className={`flex flex-col sm:gap-4 lg:gap-6 xl:gap-8 ${
        !isMobile && !inAdvSelect
          ? 'sticky sm:top-[56px] lg:top-[64px] xl:top-[72px] z-10 bg-bgPrimary dark:bg-bgPrimaryDark'
          : ''
      }`}
    >
      <div>
        <DeckCryptHeader
          inMissing={inMissing}
          isEditable={isEditable}
          sortMethods={sortMethods}
          sortMethod={cryptDeckSort}
          setSortMethod={changeCryptDeckSort}
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          deckid={deckid}
          cards={crypt}
        />
        <DeckCryptTable
          deck={deck}
          handleModalCardOpen={handleModalCardOpen}
          cards={
            inMissing
              ? useDeckCrypt(deck.crypt, 'Name')['sortedCards']
              : sortedCards
          }
          cryptTotal={cryptTotal}
          showInfo={showInfo}
          disciplinesSet={disciplinesSet}
          keyDisciplines={keyDisciplines}
          nonKeyDisciplines={nonKeyDisciplines}
          maxDisciplines={maxDisciplines}
          inSearch={inSearch}
          inMissing={inMissing}
          isModalOpen={shouldShowModal}
        />
      </div>
      {Object.keys(cryptSide).length > 0 && (
        <div className="space-y-2 opacity-60 dark:opacity-50">
          <div className="flex h-[42px] items-center bg-bgSecondary px-2 py-1 font-bold dark:bg-bgSecondaryDark">
            Side Crypt
          </div>
          <DeckCryptTable
            deck={deck}
            handleModalCardOpen={handleModalSideCardOpen}
            cards={sortedCardsSide}
            disciplinesSet={disciplinesSet}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
            inSearch={inSearch}
            inMissing={inMissing}
            isModalOpen={shouldShowModal}
          />
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
        />
      )}
    </div>
  );
};

export default DeckCrypt;
